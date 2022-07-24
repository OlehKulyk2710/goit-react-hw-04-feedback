const handleReducer = (state, action) => {
  const { type, payload } = action;

  return { ...state, [type]: state[type] + payload };
};

export default handleReducer;
