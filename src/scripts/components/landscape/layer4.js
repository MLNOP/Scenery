const layer4 = (colors) => {
  return {
    layerNumber: 4,
    svg: /* html */ `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2000 1000"
        style="
          enable-background:new 0 0 2000 1000;
          ${colors.length && colors[0] ? '--color-0:' + colors[0] + ';' : ''}
        "
        xml:space="preserve"
        width="2000"
        height="1000"
      ><path d="M0 1000.4h2000v-456c-3.9-1.1-8.2.1-10 9.5 0 0-9.9-9.8-11 3.8 0 0-11.1-7.3-14.8-1.1 0 0-8.7-11-13.6-1.1 0 0-11.2-11-18.4 3.8 0 0-7.5-12.2-12.3-1.1 0 0-6.2-8.5-14.8 2.6-3.7 3.7-11.1-7.3-16-1.1-2.5-8.6-21-15.8-23.4-2.3 0 0-9.9-9.8-14.7 5.1-3.8-11.1-28.3-4.3-28.3-4.3s-15.7-11.3-19.7-1.5c0 0-16.5-13-21.4-.7 0 2.5-12.4-13-17.2-.7 0 0-13.3-20.4-18.1-2.3-.1-7.4-17.4-15.5-18.9-3.1-11.6-11.4-20.5 3.5-20.5 3.5s-14.9-10.5-22.2.2c0 0-3.4-9-9.8 1.7 0 0-17.3-13-20.5-.7-5.8-7.3-14.8-9.7-14.7 1.8 0 0-15-20.4-17.2 1.8-3.3-6.5-14.8-8.1-20.5 2.6 0 0-2.5-8.2-8.2 1.7 0 0-6.7-14.7-11.5.1-5.8-4.9-20.6-13.8-26.3-1.4-3.3-6.5-18.2-14.6-18.9-1.5 0 0-18.1-9.7-22.1 2.7 0 0-10.8-13-14.8-.7-4.1-4-16.5-12.2-17.2 3.5-.9-5.7-6.6-9.8-13.1-.7-5.8-7.3-13.9 1.8-13.9 1.8s-6.7-20.5-14.8-5.6c0 0-16.5-16.3-18.1-.7 0 0-12.4-8.9-15.6 1 0 0-5.9-15.5-9.8 2.5-5.8-4.1-14.8-10.5-17.2 2.6-2.5-6.5-10.8-8.9-13.1 4.2 0 0-14.1-15.4-17.3-1.5-6.6-8.1-14.8-6.4-20.5 1-3.4-8.2-11.6-13-13.1 1.8 0-4.9-13.3-20.4-17.3-6.4-5-8.2-16.4 2.6-16.4 2.6s-11.6-13-14.7 5c0 0-9.9-8.1-13.1.1 0 0-10-13-19.7 5.1-9.9-8.1-32.9-12.8-41 .4 0 0-19.8-11.3-21.3 1.8-.1-6.6-11.6-19.6-21.4-6.4-1.7-9.8-11.6-16.3-16.4-4.8-5-8.2-14.9-11.4-22.9 3.5-8.3-6.5-16.4-3.1-18 3.5-.1-8.2-16.5-8.1-23-3.1-1.7-9.8-11.6-9.7-16.4 1.8 0 0-11.6-8.1-14.7 11.6-5-4.9-21.4-12.9-19.6 6.7 0 0-9.9-9.8-13.2.1-.8-2.4-4-6.7-7.4-9.6-3.4 2.9-6.6 7.2-7.4 9.6-3.2-9.9-13.2-.1-13.2-.1 1.8-19.7-14.7-11.6-19.6-6.7-3.2-19.7-14.8-11.6-14.8-11.6-4.8-11.5-14.7-11.6-16.4-1.8-6.5-5-22.9-5.1-23 3.1-1.6-6.6-9.8-9.9-18-3.5-8.1-14.8-17.9-11.6-22.9-3.5-4.8-11.5-14.7-5.1-16.5 4.8-9.8-13.2-21.4-.2-21.4 6.4-1.5-13.2-21.3-1.9-21.3-1.9-8.1-13.2-31.1-8.5-41-.3-9.5-18.1-19.5-5-19.5-5-3.2-8.3-13.1-.1-13.1-.1-3.1-18.1-14.7-5-14.7-5s-11.4-10.8-16.4-2.6c-4-14-17.3 1.5-17.3 6.4-1.5-14.8-9.8-9.9-13.1-1.8-5.7-7.5-13.9-9.2-20.5-1-3.2-14-17.3 1.5-17.3 1.5-2.4-13.2-10.6-10.7-13.1-4.2-2.4-13.1-11.4-6.7-17.2-2.6-3.9-18.1-9.8-2.5-9.8-2.5-3.2-9.9-15.6-1-15.6-1-1.5-15.6-18.1.7-18.1.7-8.1-14.8-14.8 5.7-14.8 5.7s-8.1-9.1-13.9-1.8c-6.5-9.1-12.3-5-13.1.7-.7-15.6-13.1-7.5-17.2-3.5-4-12.3-14.8.7-14.8.7-4-12.4-22.1-2.7-22.1-2.7-.7-13.2-15.5-5.1-18.9 1.5-5.6-12.3-20.5-3.5-26.3 1.4-4.8-14.8-11.5-.1-11.5-.1-5.7-9.9-8.2-1.7-8.2-1.7-5.6-10.7-17.1-9.2-20.5-2.6-2.3-22.2-17.2-1.8-17.2-1.8.1-11.5-9-9.1-14.7-1.8-3.2-12.3-20.5.7-20.5.7-6.5-10.8-9.8-1.8-9.8-1.8-7.3-10.7-22.1-.2-22.1-.2s-8.9-14.8-20.5-3.4c-1.5-12.3-18.9-4.3-18.9 3.1-4.8-18.1-18.1 2.3-18.1 2.3-4.8-12.4-17.3 3.1-17.2.7-4.8-12.3-21.4.7-21.4.7-4-9.9-19.7 1.5-19.7 1.5s-24.5-6.8-28.3 4.3c-4.8-14.8-14.7-5.1-14.7-5.1-2.3-13.6-20.9-6.3-23.4 2.2-4.9-6.2-12.4 4.8-16 1.1-8.5-11.1-14.8-2.6-14.8-2.6-4.8-11.1-12.3 1.1-12.3 1.1-7.2-14.8-18.4-3.8-18.4-3.8-4.8-9.9-13.6 1.1-13.6 1.1-3.6-6.2-14.8 1.1-14.8 1.1-1.1-13.5-11-3.8-11-3.8-1.8-9.3-6.1-10.5-10-9.5v455.9z" style="fill: var(--color-0, #a2a2a2);"/></svg>
    `
  }
}

export default layer4