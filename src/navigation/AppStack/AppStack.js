import React from "react";
import { Routes,Route } from "react-router-dom";
import { Header } from "../../components/header/header";
import { Categories } from "../../pages/Category/category";
import { Createrecipe } from "../../pages/Createrecipe/createrecipe";
import { EditRecipe } from "../../pages/Editrecipe/editRecipe";
import { Homepage } from "../../pages/homePage/Homepage";
import { AllRecipesPage } from "../../pages/Recipes/AllRecipes/Allrecipes";
export const AppStack =()=>{
    return(
        <div>
            <Header/>


            <Routes>
                <Route path="/" element={<Homepage/>}/> 
                <Route path="/recipes" element={<AllRecipesPage/>}/> 
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/create/recipes" element={<Createrecipe/>}/>
                <Route path="/edit/recipes/:id" element={<EditRecipe/>}/>
            </Routes>
        </div>
    )
}