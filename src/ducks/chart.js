const initialState = {
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
      name: "Example Chart", 
      datasets: [
        {
          label: "My First dataset", 
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
  ]
};

export default function chart( state = initialState, action ) {
  console.log('Chart reducer fired:');
  console.log('State', state);
  console.log('Action', action);
  switch(action.type) {
    default:
      return state;
  }
}