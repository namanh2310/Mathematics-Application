from latex2sympy2 import latex2sympy, latex2latex
from flask import request, jsonify
from sympy import *
import re
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from scipy.optimize import fsolve
import json
import os

def format_sketch_data(data):
    rhs = data.split('=')[-1].strip()
    lhs = data.split('=')[0].strip()
    expression_rhs = latex2sympy(rhs)
    expression_lhs = latex2sympy(lhs)
    expression = expression_lhs - expression_rhs
    return expression

def sketchGraph(data, solution):
    input = ''
    output = ''
    input = format_sketch_data(data)
    output = solution
    
    if '=' in data:
        equation_string = input
        # expr = equation_string
        expr = simplify(equation_string)
    elif 'x' in output:
        equation_string = output
        expr = simplify(latex2sympy(equation_string))
    else:
        return None

    x = symbols('x')
    func = lambdify(x, expr, "numpy")
    x_values = np.linspace(-2, 5, 400)
    y_values = func(x_values)   
    plt.figure(figsize=(8, 6))
    plt.plot(x_values, y_values, label=f'y = {latex(expr)}')
    plt.title('Graph of ' + f'y = {latex(expr)}')
    plt.xlabel('x')
    plt.ylabel('y')
    plt.grid(True)

    # Save image
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    base64_encoded = base64.b64encode(buffer.read()).decode()
    plt.close()
    base64_data_uri = "data:image/png;base64," + base64_encoded

    return base64_data_uri


def extract_bf(input_str):
    # Find the position of the first '{' after "\\bf"
    start_index = input_str.find(r'\bf') + 3  # 3 is the length of "\bf"

    # Initialize counters for '{' and '}'
    open_count = 0
    close_count = 0

    # Iterate from the starting position to find the matching '}'
    for i in range(start_index, len(input_str)):
        if input_str[i] == '{':
            open_count += 1
        elif input_str[i] == '}':
            close_count += 1

        # Check if the total count is even
        if open_count == close_count and open_count > 0:
            # Remove the first '{' and last '}'
            substring = input_str[start_index + 1:i]
            return substring

    # Return an empty string if no valid substring is found
    return ''
    # (r'\\int', r'(\\int'),
    #     (r'\\dx', ')'),
    #     (r'\\,d x', ')'),
    #     (r'\\, dx', ')'),
    #     (r'd x', ')'),

def replace_latex_math(input_string):
    replacements = [
        (" ", ""),
        (r'{\\frac{d}{dx}}', r'\\frac{d}{dx}'),
        (r' ', ''),
        (r'\\chi', 'x'),
        (r'\\prime', '1'),
        (r'\\backprime', '1'),
        (r'\\blacktrinagledown', '1'),
        (r'\\left', ''),
        (r'\\right', ''),
        (r'\\mathbf{x}', 'x'),
        (r'\\mathbf{X}', 'x'),
        (r'{\\mathbf{x}}', 'x'),
        (r'{\\mathbf{X}}', 'x'),
        (r'{\\mathcal{x}}', 'x'),
        (r'{\\mathcal{X}}', 'x'),
        (r'\\mathcal{x}', 'x'),
        (r'\\mathcal{X}', 'x'),
        (r'\\operatorname\*{lim}', r'\\lim'),
        ('arrow', r'\\to'),
        (r'\\big\(', '('),
        (r'\\big\)', ')'),
        (r'\\Bigl', ''),
        (r'\\Bigr', ''),
        (r'\\\;', ''),
        (r'\\mathrm{sin}', r'\\sin'),
        (r'\\mathrm{\\sin}', r'\\sin'),
        (r'\\mathrm{cos}', r'\\cos'),
        (r'\\mathrm{\\cos}', r'\\cos'),
        (r'\\mathrm{tan}', r'\\tan'),
        (r'\\mathrm{\\tan}', r'\\tan'),
        (r'X', r'x'),
        # (r'\\', r''),
        (r',', r'.'),
    ]

    for pattern, replacement in replacements:
        input_string = re.sub(pattern, replacement, input_string)
    # print("hello", input_string)

    if r"\bf" in input_string:
      input_string = input_string.replace(r"\bf{", "").replace(extract_bf(input_string) + "}", f"{extract_bf(input_string)}")
    
    return input_string
