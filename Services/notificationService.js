import { supabase } from "../lib/supabase";




export const createNotification = async (notification) => {
    try {
        const{data,error}=await supabase
        .from('notification')
        .insert(notification)
        .select()
        .single();
       
        if (error) {
            console.log('notification error', error);
            return { success: false, msg: "Something went wrong" };
        }

        return { success: true, data: data };
    } catch (error) {
        console.log('notification error', error);
        return { success: false, msg: "Something went wrong" };
    }
};


export const fetchNotifications = async (reciverId) => {
    try {
        const { data, error } = await supabase
            .from('notification')
            .select(`
                *,
               sender:senderId(id ,name,image)
                `)
            .eq('reciverId',reciverId)
            .order("created_at",{ascending:false, });
            
        if (error) {
            console.log('fetchNotification error', error);
            return { success: false, msg: "Could not fetch notifications" };
        }

        return { success: true, data:data};
    } catch (error) {
        console.log('fetchNotification  error', error);
        return { success: false, msg: "Could not fetch  notification" };
    }
};