import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlCategories3 } from "../endpoints";
import GenericList from "../Utils/GenericList";
import './Card.css';
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import {categ3DTO } from "./categ3.model";


export default function IndexCategory3() {

    const [search, setSearch] = useState('');


    const [categ3, setCateg3] = useState<categ3DTO[]>();

    useEffect(() => {
        axios.get(urlCategories3)
            .then((response: AxiosResponse<categ3DTO[]>) => {
                setCateg3(response.data);
                console.log(response.data);
            })
    }, [])
    return (
        <>
            <h3>Categ 3 - LISTE DE PRETURI</h3>
                <Form>
                    <InputGroup>
                        <Form.Control onChange={(e) => setSearch(e.target.value)} 
                        placeholder="Search" />
                    </InputGroup>
                </Form>
               <GenericList list={categ3}>
                    <table className="table">
                        
                        <thead>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                        </thead>
                        <tbody className="paddingTop">
                            {categ3?.filter((categ3) => {
                                return search.toLowerCase() === ''
                                ? categ3 
                                : categ3.type.toLowerCase().includes(search);
                            }).map(categ3 =>
                                <tr key={categ3.id}>
                                    <td>{categ3.category}</td>
                                    <td>{categ3.type}</td>
                                    <td>{categ3.price}</td>
                                </tr>)}
                        </tbody>
                    </table>
               </GenericList>
            
            {/* <Link className = "btn btn-secondary" to="/CATEGORY3/create">Create CATEG 3</Link> */}
        </>
    )
}


//TITLE FOR PAGE 1 - CATEG 1 => SHOULD BE CHANGED TO THE ACTUAL NAME!!!!!!!!!!!!!

// CATEGORY 2 =  ACTORS