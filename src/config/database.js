const mongoose= require('mongoose');


const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://aluriamruthrajeee:uRwZT71p0yRRkDnN@namastenode.gsjha.mongodb.net/devTinder');
}



module.exports=connectDB
