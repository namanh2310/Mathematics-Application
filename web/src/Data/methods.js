const methods = [
  {
    name: "Golden Section Method",
    inputFields: [
      {
        className: "fucntion",
        subClassName: "algorithm-function",
        inputName: "function",
        placeholder: "f(x)",
      },
      {
        className: "variables",
        subClassName: "algorithm-variable",
        inputName: "xl",
        placeholder: "x_l",
      },
      {
        className: "variables",
        subClassName: "algorithm-variable",
        inputName: "xu",
        placeholder: "x_u",
      },
      {
        className: "variables",
        subClassName: "algorithm-variable",
        inputName: "err",
        placeholder: "e_s",
      },
    ],
    types: true,
    stepOne: (data) => [
      `d = R(x_l - x_u) = \\frac{\\sqrt{5} - 1}{2} (${data[0]?.xu} - ${data[0]?.xl}) = ${data[0]?.d}`,
      `x_1 = x_l + d = ${data[0].xl} + ${data[0].d} = ${data[0].x1}`,
      `x_2 = x_u - d = ${data[0].xu} - ${data[0].d} = ${data[0].x2}`,
    ],
    stepTwo: (data, comp) => [
      `f(x_1) = ${data[0].f1} ${comp} f(x_2) = ${data[0].f2}`,
      `\\rightarrow x_l = x_{opt} = x_2 = ${data[0].x2}`,
    ],
    stepThree: (data) => [
      `e_a = (1 - R) * \\frac{interval}{x_{opt}} \\cdot 100`,
      `= (1 - \\frac{\\sqrt{5} - 1}{2})\\frac{${data[0].xu - data[0].xl}}{ ${
        data[0].x2
      }}*100=${data[0].ea}`,
    ],
    tableHeader: ["x_l", "x_2", "f(x_2)", "x_1", "f(x_1)", "x_u", "d", "e_a%"],
    tableValue: (data) => [
      data.iterator,
      data.xl,
      data.x2,
      data.f2,
      data.x1,
      data.f1,
      data.xu,
      data.d,
      data.ea,
    ],
  },
];

export default methods;
