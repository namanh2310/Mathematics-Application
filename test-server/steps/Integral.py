from utils.CalModule import sketchGraph
import os
import json
from scipy.optimize import fsolve
import base64
import io
from latex2sympy2 import latex2sympy, latex2latex
from flask import request, jsonify
from sympy import *
import re
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('agg')
import ast


def handleIntegral(formatted_str, step, solution, sympy_converter):
    x = Symbol("x")
    integrals = []
    for arg in sympy_converter.args:
        if isinstance(arg, Integral):
            integrals.append(arg)
        elif isinstance(arg, Mul) and arg.args[0].is_integer and arg.args[0].is_negative and "Integral" in str(arg):
            integrals.append(-arg)
    if len(integrals) == 0:
        integrals = [sympy_converter]

    has_two_limits = any(len(el.limits) == 2 for el in integrals)

    for i, integral in enumerate(integrals):
        integrand = integral.args[0]

        # một tích phân
        if len(integral.limits) == 1 and not has_two_limits:
            int_list = []
            sympy_expr = expand(latex2sympy(formatted_str))
            terms = sympy_expr.as_ordered_terms()

            # tách thành phần biểu thức trong tích phân --> đưa vào 1 list
            for term in terms:
                if "Integral" in str(term) and isinstance(term, Mul):
                    for arg in term.args:
                        if "Integral" in str(arg):
                            int_list.append(arg)
                else:
                    if "Integral" in str(term):
                        int_list.append(term) 

            latex_output_list = []
            print("##-----#######", int_list)
            for i, integral_expr in enumerate(int_list):
                partial_check = classify_expression(integral_expr.args[0])

                # tích phân từng phần
                if len(partial_check) == 2:  
                    partial_list = print_type_info(partial_check, x)
                    print("nnnn", partial_list)
                    all_keys = [key for expr in partial_list for key in expr.keys()]
                    min_key = min(all_keys)
                    max_key = max(all_keys)

                    for expr in partial_list:
                        if min_key in expr:
                            u = expr[min_key]
                        if max_key in expr:
                            dv = expr[max_key]

                    u = classify_expression(simplify(u))[0]
                    dv = classify_expression(simplify(dv))[0]

                    print(u)
                    print(dv)
                    if u == dv:
                        continue
          
                    v = integrate(dv, x)
                    step.append(f"\\(\\textbf{{Partial step:}}\\)")
                    step.append(f"Find v by integrating dv: \\({latex(v)}\\)")
                    du = diff(u, x)
                    step.append(f"Find du by derivating u: \\({latex(du)}\\)")
                    vdu = v*du
                    step.append(f"We calculate vdu by \\(v \\cdot du = {latex(vdu)}\\)")
                    partial_res = u * v - integrate(vdu)
                    print("tesssttt", simplify(partial_res))
                    step.append(f"We apply the formula: \\(u \\cdot v - \\i nt(vdu)\\)")
                    
                    step.append(f"Therefore, it will be \\({latex(u)} \\cdot {latex(v)} - \\int({latex(vdu)})\\)")
                    if len(latex(partial_res)) < 200 and not "\\Gamma" in latex(partial_res):
                        step.append(f", then we have anti-derivative result \\( = {latex(partial_res)} \\)")
                    if len(integral_expr.args[1]) != 1:
                        step.append(f"Subtitute from \\({integral_expr.args[1][1]}\\) to \\({integral_expr.args[1][2]}\\)")
                        if "\\Gamma" not in latex(integrate(integral_expr.args[0], (x, integral_expr.args[1][1], integral_expr.args[1][2]))):
                            step.append(f"We have, \\({latex(integrate(integral_expr.args[0], (x, integral_expr.args[1][1], integral_expr.args[1][2])))}\\)")
                        step.append(f"Simplify, \\({latex(simplify(integrate(integral_expr.args[0], (x, integral_expr.args[1][1], integral_expr.args[1][2]))))}\\)")
                    

                latex_output = latex(integral_expr)
                latex_output_list.append(latex_output)
                args_list = integral_expr.args
                for arg in args_list:
                    if "Integral" in str(arg):
                        return []
                    
                # một tích phân bình thường
                if len(args_list) > 0 and len(partial_check) == 1:
                    int_eq = args_list[0]
                    simplified_eq = expand(simplify(int_eq))
                    terms = simplified_eq.as_ordered_terms()
                    step.append(f"\\(\\textbf{{Step {i+1}}}\\)")
                    simplified_expressions = [simplify(sympify(expr)) for expr in terms]
                    step.append(f"We have, anti-derivative of \\({latex(simplified_expressions[0])}\\) is \\({latex(integrate(simplified_expressions[0], x))}\\)")
                    if len(args_list[1]) != 1:
                        step.append(f"Subtitute from \\({integral_expr.args[1][1]}\\) to \\({integral_expr.args[1][2]}\\)")
                        step.append(f"Therefore, \\({latex_output} = {latex(integral_expr.doit())}\\)")
            step.append(f"Substitute this result into the rest of the problem, we have: \\({solution}\\)")
            latex_output_string = ' , \\, '.join(latex_output_list)
            latex_output_string = f"Seperate the equation into \\({latex_output_string}\\)"
            step.insert(0, latex_output_string)
            break

        # nhiều hơn 1 tích phân
        else:
            for limit in integral.limits:
                temp_res = integrate(integrand, limit)
                print("beoi", integral.args)
                step.append(f"\\(\\textbf{{Partial step:}}\\)")
                step.append("We should integrate \\({}\\) ".format(latex(integrand)))
                step.append("Therefore, we have \\({}\\) ".format(latex(integrate(integrand, x))))
                if len(integral.args[1]) != 1:
                    step.append("Subtitute from \\({}\\) to \\({}\\) ".format(latex(limit[1]), latex(limit[2])))
                    step.append("Result will be \\({}\\) ".format(latex(temp_res)))
                integrand = temp_res
    step.append("\\(\\textbf{{Final result:}} \\, {}\\)" .format(solution))

            
def classify_expression(expr):
    print("####aa", expr)
    def get_inner_expressions(expr):
        if isinstance(expr, (Mul, Add)):
            elements = expr.args
            if len(elements) == 1:  
                return elements[0]
            else:
                return elements
        else:
            return expr

    inner_expr = get_inner_expressions(expr)
    result = []

    if isinstance(inner_expr, tuple):
        for elem in inner_expr:
            if not elem.is_number:
                result.append(elem)
    else:
        result.append(inner_expr)
    return tuple(result)

def print_type_info(expressions, x):
    result = []
    for expression in expressions:
        if str(expression) == "sin(x)**2":
            print("wow", expression)
        if isinstance(expression, log):
            if len(expression.args) == 1:
                result.append({1: expression})
        elif isinstance(expression, Pow) and not has_trigonometric_functions(str(expression)):
                base, exponent = expression.as_base_exp()
                if x in exponent.free_symbols:
                    result.append({4: expression})
                else:
                    result.append({2: expression})

        elif has_trigonometric_functions(str(expression)):
            result.append({3: expression})
        else:
            result.append({2: expression})
    return result

def has_trigonometric_functions(expression):
    trig_functions = {'sin', 'cos', 'tan'}
        
    def check_trigonometric_functions(node):    
        return any(
            isinstance(node, ast.Call) and getattr(node.func, 'id', None) in trig_functions
            for node in ast.walk(node)
        )
        
    return check_trigonometric_functions(ast.parse(expression))
