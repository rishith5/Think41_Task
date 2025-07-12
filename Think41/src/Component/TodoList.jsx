import React, { useState } from 'react';



function ToDoList() {
    let [tasklist, setTaskList] = useState(()=>{
        let store = localStorage.getItem('tasklist');
        return store ? JSON.parse(store) : [] ;
    });

    function addNewItem(item) {
        let updatedList = [...tasklist,item]
        setTaskList(updatedList);
        localStorage.setItem('tasklist',JSON.stringify(updatedList))
    }

    function deleteItem(id){
        let updatedList = tasklist.filter((item)=>(item.id!==id))
        setTaskList(updatedList)
        localStorage.setItem('tasklist',JSON.stringify(updatedList));
    }

    return (
        <>
            <Form newItem={addNewItem} />
            <TaskList tasklist={tasklist} onDeleteItem={deleteItem}/>
        </>
    );
}

export default ToDoList;

function Form({ newItem }) {
    let [itemName, setName] = useState("");
    let [qty, setQty] = useState("");

    function handleForm(e) {
        e.preventDefault();
        let newItemObj = {
            id: Math.trunc(Math.random() * 1000),
            name: itemName,
            qty,
            isDone: false
        };
        newItem(newItemObj);
        setName("");
        setQty("");
    }

    return (
     <>
      <nav className="navbar bg-info p-2 ">
                <a href="#" className="navbar-brand">React List App</a>
            </nav>
        <section className="container-fluid">
            <div className="row">
                <div className="col-6 m-auto mt-4">
                    <div className="card mt-4">
                        <div className="card-header text-center text-white bg-info ">
                            <h2>To do Lisst</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleForm}>
                                <input
                                    type="text"
                                    placeholder="Items"
                                    className="form-control mb-2"
                                    value={itemName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    className="form-control mb-2"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                                <input type="submit" className='btn btn-info btn-md' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

function TaskList({ tasklist,onDeleteItem }) {
    return (
        <section className="container-fluid">
            <div className="row">
                <div className="col-6 m-auto mt-4">
                    <div className="card">
                        <div className="card-body">
                            {tasklist.length === 0 ? (
                                <h5 className="text-center text-muted">No items Added Yet</h5>
                            ) : (
                                tasklist.map(item => <Task key={item.id} item={item} itemDelete={onDeleteItem}/>)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Task({ item,itemDelete }) {
    const { name, qty } = item;
    return (
        <div className="card">
            <div className="caard-body">

            
        
        <ol className='item-group-list'>
            <li className="d-flex justify-content-between align-items-center">
                <span>{name} {qty}</span>
                <button className='btn btn-sm btn-danger' onClick={()=>itemDelete(item.id)}>remove</button>
            </li>
        </ol>
        </div>
        </div>
        
    );
}