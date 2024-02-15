export const setPartialState = <T>(newState: Partial<T>, stateDispatch: React.Dispatch<React.SetStateAction<T>>) => {
  stateDispatch((prevState) => ({ ...prevState, ...newState }));
};
