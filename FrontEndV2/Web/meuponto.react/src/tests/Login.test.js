import React,{Component} from "react";
import renderer from "react-test-renderer";
import Login from "../pages/Login/Login";

test("Compara tela de login ao snapshot",() =>{
    let render = renderer.create(<Login />);
    let tree = render.toJSON();
    expect(tree).toMatchSnapshot();
})