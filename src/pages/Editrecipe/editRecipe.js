
import React, { useEffect, useState, useRef } from "react"
import "../Createrecipe/createrecipe.css"
import Select from 'react-select'
import ReactQuill from "react-quill"
import "../../../node_modules/react-quill/dist/quill.snow.css";

import doneImg from "../../images/doneimg.gif"
import uploadImg from "../../images/upload.gif"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { addDoc, collection, doc, deleteDoc, getDocs, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useNavigate, useParams } from "react-router-dom";




const options = [

  { value: 'Veg', label: 'Veg' },

  { value: 'Non-veg', label: 'Non-veg' }

]

export const EditRecipe = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [description, setdescription] = useState("")
  const [categorylist, setCategorylist] = useState([])
  const [title, setrecipetitle] = useState("")
  const [metainfo, setshortdescription] = useState("")
  const [recipetype, setRecipeType] = useState("")
  const [list, setCategoryList] = useState("")
  const [recipeseason, setrecipeseason] = useState("")
  const [img, setimg] = useState(uploadImg)
  const [imgurl, setImgURL] = useState("")

  const updateRecipe = async () => {
    if (imgurl.length > 5 && title.length > 5 && metainfo.length > 10 && description.length > 50) {
      try {
        const docref = await updateDoc(doc(db, "Recipes", id), {
          title,
          metainfo,
          imgurl,
          recipeseason,
          list,
          recipetype,
          description
        })
        navigate("/recipes");
      }
      catch (e) {
        console.log("error adding recipe", e)
      }
    }
    else {
      toast.warn('🦄 Inputs must be filled', {
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

const getSingleRecipeDetail = async () => {
  console.log(id)
  const blogref = await doc(db, "Recipes", id)
  const docsnap = await getDoc(blogref)
  if (docsnap.exists()) {
    console.log("your inside docsnap")
    const singleRecipeDetail = docsnap.data()
    console.log(singleRecipeDetail)
    setrecipetitle(singleRecipeDetail.title)
    setshortdescription(singleRecipeDetail.metainfo)
    setdescription(singleRecipeDetail.description)
    setRecipeType(singleRecipeDetail.recipetype)
    setCategoryList(singleRecipeDetail.list)
    setrecipeseason(singleRecipeDetail.recipeseason)
    setImgURL(singleRecipeDetail.imgurl)

  }
}

const handlechange = (e) => { setdescription(e) }

const getCategory = async () => {
  await getDocs(collection(db, "Categories")).then(res => {
    const newData = res.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
    console.log(newData)
    const data = []
    for (let i = 0; i < newData.length; i++) {
      data.push({
        value: newData[i].category,
        label: newData[i].category
      })
    }
    setCategorylist(data)
    console.log(data)
  })
}
useEffect(() => {
  getCategory()
  getSingleRecipeDetail()
}, [])

const cloudinaryRef = useRef();
const widgetRef = useRef();

useEffect(() => {
  cloudinaryRef.current = window.cloudinary;
  cloudinaryRef.current = window.cloudinary;
  widgetRef.current = cloudinaryRef.current.createUploadWidget(
    {
      cloudName: "dyeqahboy",
      uploadPreset: "zemjk6x1",
    },
    function (error, result) {
      setImgURL(result.info.files[0].uploadInfo.secure_url);
      setimg(doneImg);
    }
  );
}, [])

return (
  <div style={{ margin: "0px 35px" }}>
    <ToastContainer />
    <div className="cloudPhotosSnippet uploadImageBox">
      <div className="uploadBtn" onClick={() => widgetRef.current.open()}>
        <img src={img} alt="" />
      </div>
    </div>

    <div className="addtitlemeta">
      <input type="text" value={title} onChange={(e) => setrecipetitle(e.target.value)} placeholder="Recipe name" />
      <input type="text" value={metainfo} onChange={(e) => setshortdescription(e.target.value)} placeholder="Description in short" />
    </div>
    <div className="selects">
      <Select options={options}  onChange={(e) => setRecipeType(e.value)} placeholder="Select type" />
      <Select options={categorylist}  onChange={(e) => setCategoryList(e.value)} placeholder="Cuisine type" />
      <Select options={season} onChange={(e) => setrecipeseason(e.value)} placeholder="Best season" />
    </div>
    <div className="description">
      <ReactQuill placeholder="steps" value={description} style={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}
        modules={EditRecipe.modules} formats={EditRecipe.formats}
        onChange={handlechange} />


    </div>
    <div>
      <button  onClick={updateRecipe
      } className="butn">Update</button>
    </div>
  </div>
)
}
EditRecipe.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],

    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
EditRecipe.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];
const season = [

  { value: 'All Season', label: 'All Season' },
  { value: 'January', label: 'January' },
  { value: 'February', label: 'Febraury' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
]
