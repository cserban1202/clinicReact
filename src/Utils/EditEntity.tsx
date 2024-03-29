import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useHistory, useParams } from "react-router-dom";
import { categoriesCreationDTO } from "../CATEGORY1/categories.model";
import CategoriesForm from "../CATEGORY1/CategoriesForm";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>
(props: editEntityProps<TCreation, TRead>) {

    const {id}: any = useParams(); // to get the id from the url
    const [entity, setEntity] = useState<TCreation>(); 
    const [errors, setErrors] = useState<string[]>([]);    
    const history = useHistory(); // to redirect to another page

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((response: AxiosResponse<TRead>) => {
                setEntity(props.transform(response.data));
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); 

    async function edit(entityToEdit: TCreation) {
        try { 
            if(props.transformFormData) {
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: 'put',
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'} 
                });
            }
            else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
            history.push(props.indexURL); 
        }
        catch (error: any){ // if there is an error
            if (error && error.response) { //if the error has a response
                setErrors(error.response.data); //  set the errors
            }
        }
    }

    return (
        <>
            <h3>Edit {props.entityName}</h3>
            <DisplayErrors errors={errors}/> 
            {entity ?  props.children(entity, edit): <Loading />} 
       </>
    )
}

interface editEntityProps<TCreation, TRead> { 
    url: string;
    entityName: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity // if there is no transform function, it will return the entity
}