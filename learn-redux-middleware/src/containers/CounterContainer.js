import { useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease, increaseAsync, decreaseAsync } from "../modules/counter";

const CounterContainer = ({ number, increaseAsync, decreaseAsync }) => {
    // const number = useSelector((state) => state.number);
    // const dispatch = useDispatch();
    // const onIncrease = useCallback(() => dispatch(increaseAsync()), [dispatch]);
    // const onDecrease = useCallback(() => dispatch(decreaseAsync()), [dispatch]);
    return <Counter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync} />;
};

export default connect(
    (state) => ({
        number: state.counter,
    }),
    {
        increaseAsync,
        decreaseAsync,
    }
)(CounterContainer);
