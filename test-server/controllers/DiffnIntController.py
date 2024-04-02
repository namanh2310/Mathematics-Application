from flask import request, jsonify
import numpy as np
from sympy import *

class DiffnIntController:
    def trapezoidal():
        if request.method == "POST":
            data = request.json['input']
            function = data["function"]
            a = float(data["a"])
            b = float(data["b"])
            h = b-a
            x = Symbol('x')
            step = []
            
            try:
                functionReplace = ''
                for i in range(len(function)):
                    if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                        functionReplace += '*' + function[i]
                    else:
                        functionReplace += function[i]

                functionReplace = functionReplace.replace(' ', '').replace('^', '**')

                def functionInput(x, y):
                    return eval(functionReplace)

                def calFunctionInput(x_input, y_input):
                    return functionInput(x_input, y_input)
                
                def f_first_deri(f):
                    return diff(f, x)
                
                def f_second_deri(f_first_deri):
                    return diff(f_first_deri, x)
                
                def showEquation(f):
                    return str(f).replace('**','^').replace('*', '')
                obj = []

                def trapezoidalCal(a, b, h, function, x):
                    slopeA = calFunctionInput(a,0)
                    slopeB = calFunctionInput(b,0)
                    I = h*(slopeA + slopeB)/2
                    f_1_der = diff(function, x)
                    f_2_der = diff(f_1_der, x)
                    f_2_der_mean = integrate(f_2_der, (x, a, b)) / (b - a)
                    error = (-1/12) * f_2_der_mean * (b-a)**3
                    print("errorerrorerrorerror", latex(error))
                    print("errorerrorerrorerror", type(error))
                    obj.append({
                        "I": '{:.4f}'.format(I),
                        "error": latex(error) if str(error) == "oo" else '{:.4f}'.format(error),
                    })
                    step.append(f"Firstly, subtitute a = \\({a} \\) and b = \\({b} \\) into \\({latex(simplify(function))} \\) and calculate")
                    step.append(f"We have: \\(f(a) = {round(slopeA, 4)} \\) and \\(f(b) = {round(slopeB, 4)} \\)")
                    step.append(f"Apply the formula: \\((b - a) \\frac{{f(a) + f(b)}}{{2}} = ({b} - {a}) \\frac{{{round(slopeA, 4)} + {round(slopeB, 4)}}}{{2}} = {round(I, 4)}\\)")    
                    step.append(f"Finally, calculate error of the Trapezoidal Rule: $$ \\(\\frac{{-1}}{{12}}f''(\\xi)(b - a)^3\\)")    
                    step.append(f"while \\(f''(\\xi) = \\int_{{a}}^{{b}}{{\\frac{{f''(x)dx}}{{b - a}}}}\\)")    
                    step.append(f"Take the first and second derivative respectively, we have")    
                    step.append(f"\\(f'(x) = {latex(f_1_der)} $$ f''(x) = {latex(f_2_der)}\\)")    
                    step.append(f"Then, we have \\(f''(\\xi) = {round(f_2_der_mean, 4)}\\)")    
                    step.append(f"Therefore, error \\(E_t = {round(error, 4)}\\)")    

                    return jsonify({
                        'data': obj,
                        'step': step
                })
                return trapezoidalCal(a, b, h, functionReplace, x)
            except ValueError:
                return jsonify({'message': ValueError})
        
    def trapezoidalMA():
        if request.method == "POST":
            data = request.json['input']
            function = data["function"]
            a = float(data["a"])
            b = float(data["b"])
            n = int(data["n"])
            h = b-a
            x = Symbol('x')
            step = []
            
            try:
                functionReplace = ''
                for i in range(len(function)):
                    if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                        functionReplace += '*' + function[i]
                    else:
                        functionReplace += function[i]

                functionReplace = functionReplace.replace(' ', '').replace('^', '**')

                def functionInput(x, y):
                    return eval(functionReplace)

                def calFunctionInput(x_input, y_input):
                    return functionInput(x_input, y_input)
                
                def f_first_deri(f):
                    return diff(f, x)
                
                def f_second_deri(f_first_deri):
                    return diff(f_first_deri, x)
                
                def showEquation(f):
                    return str(f).replace('**','^').replace('*', '')
                obj = []

                def trapezoidalMACal(a, b, h, function, x, n):
                    array = np.linspace(a, b, n+1)
                    middle_sum = 0
                    slope_sum = 0
                    for i in range(len(array)):
                        if i == 0 or i == len(array)-1:
                            slope_sum += calFunctionInput(array[i],0)
                        else:
                            middle_sum += calFunctionInput(array[i],0)
                    
                    I = h*(slope_sum + 2*middle_sum)/(2*n)
                    print(f"{h}*{slope_sum} + 2*{middle_sum}/(2*{n})")
                    f_1_der = diff(function, x)
                    f_2_der = diff(f_1_der, x)
                    f_2_der_mean = integrate((len(array)-2)*f_2_der, (x, a, b)) / (b - a)
                    error = -f_2_der_mean* (b-a)**3/(12*n**2)
                    print(array)
                    new_array = []
                    new_array.extend(array)
                    rounded_array = [round(element, 4) for element in new_array]
                    array_step = str(rounded_array).replace(",",", ")
                    obj.append({
                        "I": '{:.4f}'.format(I),
                        "error": '{:.4f}'.format(error),
                    })
                    
                    print(middle_sum)
                    step.append(f"Because \\(n = {n}\\), therefore, we will seperate the range to \\({array_step}\\)")
                    step.append(f"We apply the formula: $$I = \\(\\frac{{(b - a)}}{{2n}} f(x_0) + 2 \\sum^{{n - 1}}_{{i = 1}}{{f(x_i)}} + f(x_n)\\)")
                    step.append(f"We have: $$\\(f(x_0) + f(x_n) = f({a}) + f({b}) = {round(slope_sum, 4)}\\) $$ \\(\\sum^{{n - 1}}_{{i = 1}}{{f(x_i)}} = {round(middle_sum, 4)}\\)")
                    step.append(f"Subtitute values into this formula, we have $$ \\(I =\\frac{{({b} - {a})}}{{2 \\cdot {n}}}({round(slope_sum, 4)} + 2 \\cdot {round(middle_sum, 4)}) = {round(I, 4)} \\)")
                    step.append(f"Finally, calculate error of the Trapezoidal MA Rule: $$ \\frac{{-1}}{{12}}\\sum_{{i = 1}}^{{n}}{{f''(\\xi)}}(b - a)^3")
                    step.append(f"while \\(f''(\\xi) = \\int_{{a}}^{{b}}{{\\frac{{f''(x)dx}}{{b - a}}}}\\)")
                    step.append(f"Take the first and second derivative respectively, we have")
                    step.append(f"\\(f'(x) = {latex(f_1_der)} $$ f''(x) = {latex(f_2_der)}\\)")
                    step.append(f"Then, we have \\(f''(\\xi) = {round(f_2_der_mean, 4)}\\)")
                    step.append(f"Therefore, error \\(E_t = {round(error, 4)}\\)")

                    return jsonify({
                        'data': obj,
                        'step': step,
                })
                return trapezoidalMACal(a, b, h, functionReplace, x, n)
            except:
                return jsonify({'message': 'Please re-check the input fields'})
        
    def simpson13Rule():
        if request.method == "POST":
            data = request.json['input']
            function = data["function"]
            a = float(data["a"])
            b = float(data["b"])
            n = (b-a)/2
            step = []

            try:
                x = Symbol('x')
                functionReplace = ''
                for i in range(len(function)):
                    if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                        functionReplace += '*' + function[i]
                    else:
                        functionReplace += function[i]

                functionReplace = functionReplace.replace(' ', '').replace('^', '**')

                intFunction = integrate(functionReplace, x)

                def functionInput(x, y):
                    return eval(functionReplace)
                
                def round_expr(expr, num_digits):
                    return expr.xreplace({n : round(n, num_digits) for n in expr.atoms(Number)})
                
                def calFunctionInput(x_input, y_input):
                    return functionInput(x_input, y_input)
                
                def integrated_function(f, a, b):
                    return integrate(f, (x, a, b))
                
                obj = []

                def simpson13(a, b ,n):
                    I = (n/3)*(calFunctionInput(a, 0)+ 4*calFunctionInput(n, 0)+ calFunctionInput(b, 0))
                    true_value = integrated_function(functionReplace, a, b) 
                    error = ((true_value - I)/true_value)*100
                    obj.append({
                        "I": '{:.4f}'.format(I),
                        "true_value": '{:.4f}'.format(true_value),
                        "error": '{:.4f}'.format(error),
                    })
                    step.append(f"Firstly, we Find the true value of integral by taking the anti-derivative of the function")
                    step.append(f"\\({function}\\)")
                    step.append(f"\\(\\rightarrow {latex(round_expr(intFunction, 2))} \\)")
                    step.append(f"Subtitute a and b to the above equation, we have the true value:")
                    step.append(f"\\(TV = {round(true_value, 4)}\\)")
                    step.append(f"Next, we use Simpson 1/3 Rule, we have a formula:")
                    step.append(f"\\(I = \\frac{{h}}{{3}}[f(x_{{0}})+4f(x_{{1}})+f(x_{{2}})]\\)")
                    step.append(f"While, we have, \\(h = \\frac{{b-a}}{{2}}\\)")
                    step.append(f"Apply this formula, we have:")
                    step.append(f"\\(I = \\frac{{{n}}}{{3}}[f({a}+f({n})+f({b}))]\\)")
                    step.append(f"Therefore, \\(I = {round(I, 4)}\\)")
                    step.append(f"Calculate the error:")
                    step.append(f"\\(E = \\frac{{TV-I}}{{TV}} \\cdot 100% \\)")
                    step.append(f"\\(= \\frac{{{round(true_value, 4)}-{round(I, 4)}}}{{{round(true_value, 4)}}} \\cdot 100%\\)")
                    step.append(f"\\( = {round(error, 4)}\\)")

                    return jsonify({
                            "data": obj,
                            "step": step
                        })
                return simpson13(a, b, n)
            except ValueError:
                return jsonify({'message': 'Please re-check the input fields'})
            
    def simpson13MARule():
        if request.method == "POST":
            data = request.json['input']
            function = data["function"]
            a = float(data["a"])
            b = float(data["b"])
            n = int(data["n"])
            step = []


            try:
                x = Symbol('x')
                
                functionReplace = ''
                for i in range(len(function)):
                    if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                        functionReplace += '*' + function[i]
                    else:
                        functionReplace += function[i]

                functionReplace = functionReplace.replace(' ', '').replace('^', '**')

                intFunction = integrate(functionReplace, x)

                def functionInput(x, y):
                    return eval(functionReplace)
                
                def round_expr(expr, num_digits):
                    return expr.xreplace({n : round(n, num_digits) for n in expr.atoms(Number)})
                
                def calFunctionInput(x_input, y_input):
                    return functionInput(x_input, y_input)
                
                def integrated_function(f, a, b):
                    return integrate(f, (x, a, b))
                
                obj = []

                def simpson13ma(a, b ,n):
                    denominator = 0
                    array = np.linspace(a, b, n+1)
                    numpy_array = np.array(array)
                    rounded_list = np.round(numpy_array, 4).tolist()
                    # slope = calFunctionInput(a,0)
                    true_value = integrated_function(functionReplace, a, b)
                    for i in range(len(array)):
                        if i == 0 or i == len(array)-1:
                            denominator += calFunctionInput(array[i],0)
                        elif i%2 == 0:
                            denominator += 2*calFunctionInput(array[i],0)
                        else:
                            denominator += 4*calFunctionInput(array[i],0)
                    I = (b-a)*(denominator/(3*n))
                    error = ((true_value - I)/true_value)*100
                    new_array = []
                    new_array.extend(array)
                    rounded_array = [round(element, 4) for element in new_array]
                    array_step = str(rounded_array).replace(",",", ")
                    obj.append({
                        "I": '{:.4f}'.format(I),
                        "true_value": '{:.4f}'.format(true_value),
                        "error": '{:.4f}'.format(error),
                    })
                    step.append(f"Firstly, find all segments from a to b, we separate the integral based on \\(n = {n}\\)")
                    step.append(f"so the segments are \\({array_step}\\)")
                    step.append(f"Next, calculate the true value")
                    step.append(f"\\({function} $$ = {latex(round_expr(intFunction, 2))}\\")
                    step.append(f"Subtitute a and b into the above, we have")
                    step.append(f"\\(TV = {round(true_value, 4)}\\)")
                    step.append(f"So, apply the formula")
                    step.append(f"\\(I = (b - a)\\frac{{f(x_0) \\cdot 4\\sum{{i_{{\\mathrm{{odd}}}}^{{n-1}}}}{{f(x_i)}} + 2\\sum{{j_{{\\mathrm{{even}}}}f(x_j)+f(x_n)}}}}{{3n}}\\)")
                    step.append(f"\\(I = ({array[len(array) - 1]} - {array[0] })\\frac{{{round(denominator, 4)}}}{{3 \\cdot {n}}} = {round(I, 4)}  \\)")
                    step.append(f"Calculate the error:")
                    step.append(f"\\(E = \\frac{{TV - I}}{{TV}} = \\frac{{{round(true_value, 4)} - {round(I, 4)}}}{{{round(true_value, 4)}}} = {abs(round(error, 4))}\\)")

                    return jsonify({
                            "data": obj,
                            "step": step,
                        })
                return simpson13ma(a, b, n)
            except ValueError:
                return jsonify({'message': 'Please re-check the input fields'})
            
    def simpson38Rule():
        if request.method == "POST":
            data = request.json['input']
            function = data["function"]
            a = float(data["a"])
            b = float(data["b"])
            n = int(data["n"])
            h = (b-a)/3
            step = []
            try:
                x = Symbol('x')
                functionReplace = ''
                for i in range(len(function)):
                    if (function[i] == 'x' or function[i] == 'y') and i > 0 and function[i - 1].isdigit():
                        functionReplace += '*' + function[i]
                    else:
                        functionReplace += function[i]

                functionReplace = functionReplace.replace(' ', '').replace('^', '**')
                
                intFunction = integrate(functionReplace, x)

                def functionInput(x, y):
                    return eval(functionReplace)
                
                def round_expr(expr, num_digits):
                    return expr.xreplace({n : round(n, num_digits) for n in expr.atoms(Number)})
                
                def calFunctionInput(x_input, y_input):
                    return functionInput(x_input, y_input)
                
                def integrated_function(f, a, b):
                    return integrate(f, (x, a, b))
                
                obj = []

                def simpson38(a, b , n, h):
                    points_value = 0
                    array = np.linspace(a, b, n+1)
                    numpy_array = np.array(array)
                    rounded_list = np.round(numpy_array, 4).tolist()
                    slope = calFunctionInput(a,0)
                    true_value = integrated_function(functionReplace, a, b)
                    for i in range(len(array)):
                        if i == 0 or i == len(array)-1:
                            points_value += calFunctionInput(array[i],0)
                        else:
                            points_value += 3*calFunctionInput(array[i],0)   
                    I = (3*h/8)*(points_value)
                    error = (abs(true_value - I)/true_value)*100
                    new_array = []
                    new_array.extend(array)
                    rounded_array = [round(element, 4) for element in new_array]
                    array_step = str(rounded_array).replace(",",", ")
                    obj.append({
                        "I": '{:.4f}'.format(I),
                        "true_value": '{:.4f}'.format(true_value),
                        "error": '{:.4f}'.format(error),
                    })
                    step.append(f"Firstly, find all segments from a to b, we separate the integral based on \\(n = {n}\\)")
                    step.append(f"so the segments are \\({array_step}\\)")
                    step.append(f"Next, calculate the true value")
                    step.append(f"\\(\\int_{{a}}^{{b}}{{f(x)}} = {latex(round_expr(intFunction, 2))} \\)")
                    step.append(f"Subtitute \\( a = {a} \\) and \\( b = {b} \\)")
                    step.append(f"\\(= {round(true_value, 4)}\\)")
                    step.append(f"Next, we apply the formula to find the integral")
                    step.append(f"\\( I = \\frac{{3h}}{{8}}[f(x_0) + 3f(x_1) + 3f(x_2) + f(x_0)]  \\)")
                    step.append(f"while, \\(h = \\frac{{b - a}}{{2}} = \\frac{{x_2 - x_0}}{{2}} \\)")
                    step.append(f"Therefore \\(I = \\frac{{3 \\cdot (\\frac{{{b} - {a}}}{{2}})}}{{8}} \\cdot ({round(points_value, 4)})\\)")
                    step.append(f"Finally, calculate the error")
                    step.append(f"\\(E = \\frac{{TV - I}}{{TV}} = \\frac{{{round(true_value, 4)} - {round(I, 4)}}}{{{round(true_value, 4)}}} = {round(error, 4)}\\)")

                    return jsonify({
                            "data": obj,
                            "step": step,
                    })
                return simpson38(a, b, n, h)
            except ValueError:
                return jsonify({'message': 'Please re-check the input fields'})