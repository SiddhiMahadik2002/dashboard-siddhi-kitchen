import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, deleteDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import "./Categories.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export const Categories = () => {
    const [categoryList, setcategorylist] = useState([])
    const [category, setcategory] = useState("")
    const addcategory = async () => {
        if (category.length != 0 && (category != null && category.length >= 2)) {
            try {
                const docref = await addDoc(collection(db, "Categories"), {
                    category: category
                })
                setcategory("")
            }
            catch (e) {
                console.log("error adding category", e)
            }
        }
        else {
            console.log("Empty")
            toast.warn('🦄 Category should not be empty', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const getCategories = async () => {
        await getDocs(collection(db, "Categories")).then(res => {

            const newData = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setcategorylist(newData)
            console.log(newData)
        });
    };
    const deleteCategories = async (id) => {
        await deleteDoc(doc(db,"Categories",id)).then(res =>{
         
          
            getCategories()
        })
        .catch(e=>console.log("error",e))
    }
    useEffect(() => {
        getCategories()
    }, [category])
    const onEnterPress=(e)=>{
       if(e.key=="Enter"){
        addcategory()
       }
    }
    return (
        <div className="categories">
            <ToastContainer />
            <div className="addnewcategory">
                <input onKeyDown={onEnterPress} type="text" placeholder="Category name" onChange={(e) => setcategory(e.target.value)} value={category} />
                <button onClick={addcategory}>Add</button>
            </div>

            <div className="categorylist">
                {
                    categoryList.map(item => (
                        <div className="singlecategorylist">
                            <p>{item.category}</p>
                            <ion-icon  onClick={()=>deleteCategories(item.id)}name="trash-outline"></ion-icon>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

