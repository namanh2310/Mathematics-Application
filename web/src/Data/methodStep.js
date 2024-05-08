const GSSDATA = [
  {
    type: "text",
    stepTitle: "Calculate",
    stepContent: (data) => [
      `d = R(x_l - x_u) = \\frac{\\sqrt{5} - 1}{2} (${data[0]?.xu} - ${data[0]?.xl}) = ${data[0]?.d}`,
      `x_1 = x_l + d = ${data[0].xl} + ${data[0].d} = ${data[0].x1}`,
      `x_2 = x_u - d = ${data[0].xu} - ${data[0].d} = ${data[0].x2}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Check",
    stepContent: (data, comp) => [
      `f(x_1) = ${data[0].f1} ${comp} f(x_2) = ${data[0].f2}`,
      `\\rightarrow x_l = x_{opt} = x_2 = ${data[0].x2}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Error",
    stepContent: (data) => [
      `e_a = (1 - R) * \\frac{interval}{x_{opt}} \\cdot 100`,
      `= (1 - \\frac{\\sqrt{5} - 1}{2})\\frac{${data[0].xu - data[0].xl}}{ ${
        data[0].x2
      }}*100=${data[0].ea}`,
    ],
  },
  {
    type: "table",
    tableHeader: [
      "i",
      "x_l",
      "x_2",
      "f(x_2)",
      "x_1",
      "f(x_1)",
      "x_u",
      "d",
      "e_a%",
    ],
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

const NMDATA = [
  {
    type: "text",
    stepTitle: "Calculate",
    stepContent: (data, funct, first_deri, second_deri) => [
      `f(x) = ${funct}`,
      `\\rightarrow f(${data[0].x0})=${data[0].fx}`,
      `f'(x) = ${first_deri}`,
      `\\rightarrow f'(${data[0].x0})=${data[0].f_1st})`,
      `f'(x) = ${first_deri}`,
      `\\rightarrow f"(${data[0].x0})=${data[0].f_2nd}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Subtitute",
    stepContent: (data) => [
      ` x_{1} = x_i - \\frac{f'(x_0)}{f''(x_0)}`,
      `x_{1} = \\frac{${data[0].f_1st}}{${data[0].f_2nd}} = ${data[1].x0}`,
    ],
  },

  {
    type: "table",
    tableHeader: ["i", "x", "f(x)", "f'(x)", 'f"(x)', "e_a%"],
    tableValue: (data) => [
      data.iterator,
      data.x0,
      data.fx,
      data.f_1st,
      data.f_2nd,
      data.ea,
    ],
  },
];

const PIDATA = [
  {
    type: "text",
    stepTitle: "Calculate",
    stepContent: (b_x_0, c_f_0, d_x_1, e_f_1, f_x_2, g_f_2, h_x_3, i_f_3) => [
      `x_3 = \\frac{f(x_0)(x_1^2 - x_2^2) + f(x_1)(x_2^2 - x_0^2) + f(x_2)(x_0^2 - x_1^2)}{(2 * f(x_0) * (x_1 - x_2) + 2 * f(x_1) * (x_2 - x_0) + 2 * f(x_2) * (x_0 - x_1))}`,
      ` = \\frac{  ${b_x_0} * (${c_f_0}^2 - ${f_x_2}^2) + ${d_x_1} * (${f_x_2}^2 -  ${b_x_0}^2) + ${f_x_2} * (${b_x_0}^2 - ${d_x_1}^2)}{2 * ((${c_f_0} * (${d_x_1} - ${f_x_2})) + ${e_f_1} * (${f_x_2} - ${b_x_0}) + ${g_f_2} * (${b_x_0} - ${d_x_1}))}`,
      ` = ${h_x_3}`
    ],
  },

  {
    type: "text",
    stepTitle: "Subtitute x0, x1, x2 = x1, x2, x3 respectively. We can get the first iteration's result!",
    stepContent: () => [],
  },

  {
    type: "table",
    tableHeader: ["i", "x", "f(x)", "f'(x)", 'f"(x)', "e_a%"],
    tableValue: (data) => [
      data.iterator,
      data.x0,
      data.fx,
      data.f_1st,
      data.f_2nd,
      data.ea,
    ],
  },
];

export { GSSDATA, NMDATA };
