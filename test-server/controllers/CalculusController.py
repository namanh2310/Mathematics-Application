from steps.Equation import handleEquation
from steps.Integral import handleIntegral
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


class CalculusController:
    def FundamentalFunc():
        if request.method == "POST":
            try:
                step = []
                indexes = []
                start_index = 0
                pattern = r"(?<!\{)dx(?!})"
                pattern2 = r"(?<!\{)d(?!})"

                rd = request.json['data'].replace(" ", "").replace("\\,", "").replace("\\.", "")
                if "dx" in rd and "int" in rd:
                    data = re.sub(pattern, ')', rd).replace("\\int", "(\\int")
                else:
                    data = re.sub(pattern2, '', rd)
                
                while True:
                    index = data.find("{d}{", start_index)
                    if index == -1:
                        break
                    indexes.append(index)
                    start_index = index + 1

                for index in indexes:
                    next_character_d = data[index + 4]
                    next_character_x = data[index + 5]
                    next_character_close = data[index + 6]

                    char_check = next_character_d + next_character_x + next_character_close
                    if char_check == "dx}":
                        pass
                    else:
                        return jsonify({'message': "emyeuanh"})
                        break
                data = data.replace("\\frac{d}{dx}", "###").replace("d","").replace("###", "\\frac{d}{dx}")        
                raw_data = repr(data)
                print("uuuuuuuuuuuuuuuu", raw_data)

                try:
                    expr = sympify(raw_data)
                    print("##############3", latex2sympy(expr))
                    
                    sympy_converter = latex2sympy(expr)
                    solution = latex2latex(expr)

                    # test = latex2sympy(solution)
                except ValueError:
                    return jsonify({'message': ValueError})
                x = Symbol('x')

                if '=' not in expr and "Integral" in str(sympy_converter):
                    print("#!@#@!#!@#!")
                    try:
                        handleIntegral(expr, step, solution, sympy_converter)
                    except:
                        return jsonify({'result': solution, 'equation': data, 'step': step})
                    print("#!@#@!#!@#11111!")

                elif '=' in expr:
                    solution = handleEquation(step, expr, data, solution)

                if len(step) == 0:
                        step.append("\\(\\textbf{{No step for this problem!}}\\)")
                try:
                    return jsonify({'result': solution, 'equation': data, 'step': step, 'img': sketchGraph(data, solution)})
                except Exception as e:
                    return jsonify({'result': solution, 'equation': data, 'step': step})

            except ValueError:
                return jsonify({'message': ValueError})

    def LinearAlgebraFunc():
        if request.method == "POST":
            step = []
            data = request.json['input']
            category = data['category']

            def string_to_matrix(input_string_raw):
                input_string_raw = input_string_raw.replace(
                    '"', '').replace('\\n', '\n')
                input_string = re.sub(r'(\d+)\s+\n', r'\1\n', input_string_raw)
                input_string = input_string.rstrip()
                rows = input_string.split('\n')
                matrix = []
                for row in rows:
                    elements = row.split(' ')
                    matrix.append([int(element) for element in elements])

                return np.array(matrix)

            matrixA = string_to_matrix(data['x'])
            matrixB = string_to_matrix(data['y'])
            if category == '1':  # A + B
                rows, cols = matrixA.shape
                result = np.zeros((rows, cols), dtype=int)
                category = 'sum'
                for i in range(rows):
                    for j in range(cols):
                        result[i, j] = matrixA[i, j] + matrixB[i, j]
                        txt = f"{matrixA[i, j]} + {matrixB[i, j]} = {result[i, j]}"
                        step.append(txt)

            if category == '2':  # A - B
                rows, cols = matrixA.shape
                category = 'difference'
                result = np.zeros((rows, cols), dtype=int)

                for i in range(rows):
                    for j in range(cols):
                        result[i, j] = matrixA[i, j] - matrixB[i, j]
                        txt = f"{matrixA[i, j]} - {matrixB[i, j]} = {result[i, j]}"
                        step.append(txt)

            if category == '3':  # A x B
                rows, cols = matrixA.shape
                category = 'product'
                result = np.zeros((rows, cols), dtype=int)

                for i in range(rows):
                    for j in range(cols):
                        result[i, j] = matrixA[i, j] * matrixB[i, j]
                        txt = f"{matrixA[i, j]} x {matrixB[i, j]} = {result[i, j]}"
                        step.append(txt)

            if category == '4':  # A dot B
                rows1, cols1 = matrixA.shape
                rows2, cols2 = matrixB.shape
                category = 'dot product'
                if cols1 != rows2:
                    raise ValueError(
                        "Matrix dimensions are not compatible for dot product.")
                dot_product_step_by_step = np.zeros((rows1, cols2), dtype=int)
                result = np.dot(matrixA, matrixB)
                for i in range(rows1):
                    for j in range(cols2):
                        for k in range(cols1):
                            product = matrixA[i, k] * matrixB[k, j]
                            step.append(
                                f"{matrixA[i, k]} x {matrixB[k, j]} = {product}")
                            dot_product_step_by_step[i, j] += product
                        step.append(
                            f"Partial Sum for element at ({i}, {j}) = {dot_product_step_by_step[i, j]}")

            if category == '5':  # A dot B
                category = 'convolution'
                matrix_size = data['size']
                matrix_size = matrix_size.replace('"', '')
                convRows, convColumns = map(int, matrix_size.split("x"))
                kernel_rows, kernel_cols = matrixB.shape
                result = np.zeros((convRows, convColumns), dtype=int)
                step.append('Calculate with 2 first steps:')
                for i in range(convRows):
                    for j in range(convColumns):
                        patch = matrixA[i:i + kernel_rows, j:j + kernel_cols]
                        convolution_result = patch * matrixB
                        convolution_sum = np.sum(convolution_result)
                        result[i, j] = convolution_sum
                        if j < 2 and i < 1:
                            step.append(patch.tolist())
                            step.append(matrixB.tolist())
                            step.append(
                                f"We make a sum for whole of this matrix = {convolution_sum}")

                step.append(
                    'Do continuously with the rest of matrix, and then we have the final result!')

            return jsonify({'matrixA': matrixA.tolist(), 'matrixB': matrixB.tolist(), 'category': category, 'result': result.tolist(), 'step': step})


###############
        

#         from steps.Equation import handleEquation
# from steps.Integral import handleIntegral
# from utils.CalModule import sketchGraph
# import os
# import json
# from scipy.optimize import fsolve
# import base64
# import io
# from latex2sympy2 import latex2sympy, latex2latex
# from flask import request, jsonify
# from sympy import *
# import re
# import numpy as np
# import matplotlib.pyplot as plt
# import matplotlib
# matplotlib.use('agg')


# class CalculusController:
#     def FundamentalFunc():
#         if request.method == "POST":
#             try:
#                 step = []
#                 data = request.json['data']
#                 # pattern = r"(?<!\{)dx(?!})"
#                 # raw_data = repr(re.sub(pattern, '', data))
#                 raw_data = repr(data)
#                 print(raw_data)

#                 try:
#                     expr = sympify(raw_data).replace("\\int", "(\\int").replace("dx", ")")
#                     print("#@#!#!@#", expr)
#                     sympy_converter = latex2sympy(expr)
#                     solution = latex2latex(expr)

#                     # test = latex2sympy(solution)
#                 except ValueError:
#                     return jsonify({'message': "error"})
#                 x = Symbol('x')

#                 terms = sympy_converter.as_ordered_terms()
#                 for term in terms:
#                     if isinstance(term, Integral):
#                         print(122323)
#                         handleIntegral(sympy_converter, step, x)

#                 # if '=' not in expr:
#                 #     handleIntegral(sympy_converter, step, x)
#                 if '=' in expr:
#                     solution = handleEquation(step, expr, data, solution)
#                 try:
#                     return jsonify({'result': solution, 'equation': data, 'step': step, 'img': sketchGraph(data, solution)})
#                 except Exception as e:
#                     return jsonify({'result': solution, 'equation': data, 'step': step})

#             except ValueError:
#                 return jsonify({'message': "error"})

#     def LinearAlgebraFunc():
#         if request.method == "POST":
#             step = []
#             data = request.json['input']
#             category = data['category']

#             def string_to_matrix(input_string_raw):
#                 input_string_raw = input_string_raw.replace(
#                     '"', '').replace('\\n', '\n')
#                 input_string = re.sub(r'(\d+)\s+\n', r'\1\n', input_string_raw)
#                 input_string = input_string.rstrip()
#                 rows = input_string.split('\n')
#                 matrix = []
#                 for row in rows:
#                     elements = row.split(' ')
#                     matrix.append([int(element) for element in elements])

#                 return np.array(matrix)

#             matrixA = string_to_matrix(data['x'])
#             matrixB = string_to_matrix(data['y'])
#             if category == '1':  # A + B
#                 rows, cols = matrixA.shape
#                 result = np.zeros((rows, cols), dtype=int)
#                 category = 'sum'
#                 for i in range(rows):
#                     for j in range(cols):
#                         result[i, j] = matrixA[i, j] + matrixB[i, j]
#                         txt = f"{matrixA[i, j]} + {matrixB[i, j]} = {result[i, j]}"
#                         step.append(txt)

#             if category == '2':  # A - B
#                 rows, cols = matrixA.shape
#                 category = 'difference'
#                 result = np.zeros((rows, cols), dtype=int)

#                 for i in range(rows):
#                     for j in range(cols):
#                         result[i, j] = matrixA[i, j] - matrixB[i, j]
#                         txt = f"{matrixA[i, j]} - {matrixB[i, j]} = {result[i, j]}"
#                         step.append(txt)

#             if category == '3':  # A x B
#                 rows, cols = matrixA.shape
#                 category = 'product'
#                 result = np.zeros((rows, cols), dtype=int)

#                 for i in range(rows):
#                     for j in range(cols):
#                         result[i, j] = matrixA[i, j] * matrixB[i, j]
#                         txt = f"{matrixA[i, j]} x {matrixB[i, j]} = {result[i, j]}"
#                         step.append(txt)

#             if category == '4':  # A dot B
#                 rows1, cols1 = matrixA.shape
#                 rows2, cols2 = matrixB.shape
#                 category = 'dot product'
#                 if cols1 != rows2:
#                     raise ValueError(
#                         "Matrix dimensions are not compatible for dot product.")
#                 dot_product_step_by_step = np.zeros((rows1, cols2), dtype=int)
#                 result = np.dot(matrixA, matrixB)
#                 for i in range(rows1):
#                     for j in range(cols2):
#                         for k in range(cols1):
#                             product = matrixA[i, k] * matrixB[k, j]
#                             step.append(
#                                 f"{matrixA[i, k]} x {matrixB[k, j]} = {product}")
#                             dot_product_step_by_step[i, j] += product
#                         step.append(
#                             f"Partial Sum for element at ({i}, {j}) = {dot_product_step_by_step[i, j]}")

#             if category == '5':  # A dot B
#                 category = 'convolution'
#                 matrix_size = data['size']
#                 matrix_size = matrix_size.replace('"', '')
#                 convRows, convColumns = map(int, matrix_size.split("x"))
#                 kernel_rows, kernel_cols = matrixB.shape
#                 result = np.zeros((convRows, convColumns), dtype=int)
#                 step.append('Calculate with 2 first steps:')
#                 for i in range(convRows):
#                     for j in range(convColumns):
#                         patch = matrixA[i:i + kernel_rows, j:j + kernel_cols]
#                         convolution_result = patch * matrixB
#                         convolution_sum = np.sum(convolution_result)
#                         result[i, j] = convolution_sum
#                         if j < 2 and i < 1:
#                             step.append(patch.tolist())
#                             step.append(convolution_result.tolist())
#                             step.append(
#                                 f"We make a sum for whole of this matrix = {convolution_sum}")

#                 step.append(
#                     'Do continuously with the rest of matrix, and then we have the final result!')

#             return jsonify({'matrixA': matrixA.tolist(), 'matrixB': matrixB.tolist(), 'category': category, 'result': result.tolist(), 'step': step})
