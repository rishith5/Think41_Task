import React from "react";
import ReactDom from "react-dom/client";
import Task1 from "./Task1"

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'mdbootstrap/css/mdb.css';
import 'mdbootstrap/css/bootstrap.css';


let rootE1=document.getElementById("root");
let root1=ReactDom.createRoot(rootE1);
root1.render(<Task1/>);

