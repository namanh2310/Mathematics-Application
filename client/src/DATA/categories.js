import {
  faSquareRootAlt,
  faRulerCombined,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  {
    id: 0,
    title: 'Calculus',
    desc: 'Giai tich',
    icon: faSquareRootAlt,
    field: [
      {
        title: 'Fundamental',
        link: 'Fundamental',
      },
      {
        title: 'Derivative',
        link: 'Derivative',
      },
      {
        title: 'Integral',
        link: 'Integral',
      },
      {
        title: 'Limit',
        link: 'Limit',
      },
      {
        title: 'Equations',
        link: 'Equations',
      },
    ],
  },
  {
    id: 1,
    title: 'Geometric',
    desc: 'Hinh hoc',
    icon: faRulerCombined,
    field: [
      {
        title: 'Circle',
        link: 'Circle',
      },
      {
        title: 'Rectangle',
        link: 'Rectangle',
      },
      {
        title: 'Square',
        link: 'Square',
      },
    ],
  },
  {
    id: 2,
    title: 'TMC',
    desc: 'TMC',
    icon: faInfinity,
    field: [
      {
        title: 'Optimize',
        // link: 'Optimize',
        press: 'Optimize',
        method: [
          {
            title: 'Golden Section',
            link: 'Golden Section',
            link_solution: 'Golden Section SOL',
          },
          {
            title: 'Newton Method',
            link: 'Newton Method',
            link_solution: 'Newton Method SOL',
          },
          {
            title: 'Parabolic Interpolation',
            link: 'Parabolic Interpolation',
            link_solution: 'Parabolic Interpolation SOL',
          },
        ],
      },
      {
        title: 'Linear',
        // link: 'Linear',
        press: 'Linear',
      },
      {
        title: 'ODE',
        // link: 'ODE',
        press: 'ODE',
        method: [
          {
            title: 'Euler Method',
            link: 'Euler Method',
            link_solution: 'Euler Method SOL',
          },
          {
            title: 'Heun Method',
            link: 'Heun Method',
            link_solution: 'Heun Method SOL',
          },
        ],
      },
    ],
  },
];

export default categories;
