import React from "react";
import App from "../src/App";
import renderer from "react-test-render";

test ("App-snapshot", ()=>{
    const shot = renderer.create(
        <App/>
    ).to.JSON;
    expect(shot).toMatchSnapshot();
});