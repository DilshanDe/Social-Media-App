import { supabase } from "../lib/supabase";

export const getUserData= async(userId)=>{
    try{
        const{data,error}= await supabase
        .from('users')
        .select()
        .eq('id',userId)
        .single();
        if(error){
            return{succes:false,msg:error?.message}

        }
        return{succes:true,data};

    }catch(error){
        console.log('got error',error);
        return{succes:false,msg:error.message}
    }
}
export const updateUser= async(userId,data)=>{
    try{
        const{error}= await supabase
        .from('users')
        .update(data)
        .eq('id',userId);
        if(error){
            return{succes:false,msg:error?.message}

        }
        return{succes:true,data};

    }catch(error){
        console.log('got error',error);
        return{succes:false,msg:error.message}
    }
}