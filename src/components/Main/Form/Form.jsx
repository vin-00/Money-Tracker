
import {TextField , Grid , Button , FormControl , InputLabel , Select , MenuItem} from "@mui/material"

import { ExpenseTrackerContext } from "../../../context/context";
import { useContext } from "react";

import {v4 as uuidv4} from 'uuid';
import {useState} from "react";
import formatDate from "../../../utils/formatDate";

const initialState = {
    amount : '',
    category:'',
    type : 'Income',
    date : formatDate(new Date()),
}

export default function Form(){

    const {addTransaction , incategory , excategory} = useContext(ExpenseTrackerContext);
    const [formData , setFormData] = useState(initialState);

    const[text , setText] = useState("Create");
    const createTransaction = ()=>{
        
        if(!formData.amount || !formData.date || !formData.category){
            setText("Please fill out the fields properly!");
            return;
        }
        
        const transaction = {...formData , amount : Number(formData.amount) , id :uuidv4()}
        addTransaction(transaction);
        setFormData(initialState);
    }   

    const selectedCategories = formData.type =="Income" ? incategory : excategory;
    return (
        <Grid container spacing={2} mt="20px">
            
            <Grid item xs={6} >
                <FormControl fullWidth variant="filled">
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e)=>{
                        setFormData({...formData , type: e.target.value , category : ''});
                        setText("Create");
                    } }>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth variant="filled">
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e)=> {
                        setFormData({...formData ,category: e.target.value})
                        setText("Create");
                        }}>
                        {selectedCategories.map((c)=><MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>{
                    setFormData({...formData,amount:e.target.value})
                    setText("Create");
                    }} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e)=>{
                    setFormData({...formData,date:formatDate(e.target.value)})
                    setText("Create");
                    }} />
            </Grid>

            <Button  style={{marginTop:"20px" , marginLeft:"15px"}} variant="contained" color={text=="Create" ? "primary" : "error"} fullWidth onClick={createTransaction}>{text}</Button>
        </Grid>
    )
}