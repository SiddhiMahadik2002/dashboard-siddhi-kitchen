import React, { useEffect, useState } from "react";
import "./allrecipes.css"
import { Header } from "../../../components/header/header";
import { addDoc, collection, doc, deleteDoc, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"
import { getActiveElement } from "@testing-library/user-event/dist/utils";
import { EditRecipe } from "../../Editrecipe/editRecipe";
import { useNavigate } from "react-router-dom";

export const AllRecipesPage=()=>{
    const navigate = useNavigate()
    const [recipes,setrecipes]=useState([])
    const getAllRecipes=async()=>{
        await getDocs(collection(db,"Recipes")).then(res =>{
            const newData = res.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id
            }));
            setrecipes(newData)
            console.log(newData)
        })
    }
    const deleteRecipe =async(id)=>{
      await deleteDoc(doc(db,"Recipes",id)).then(res=>{
        getAllRecipes()
      })
      .catch(e=>console.log("error",e))
    }
    useEffect(()=>{
        getAllRecipes()
    },[])
     
    return(
        <div className="allrecipes">
            {
                recipes.map(item =>(
                    <div className="singlerecipebox">
                <p>{item.title}</p>
                <div className="singlerecipeboxbtn">
                    <button onClick={()=>{deleteRecipe(item.id)}}>Delete</button>
                    <button onClick={()=>{navigate(`/edit/recipes/${item.id}`)}}>Edit</button>
                </div>
            </div>
                ))
            }
           
        </div>
    )
}