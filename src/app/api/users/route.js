import { supabase } from "../lib/supabase";


export async function GET() {
    const {data, error} = await supabase
    .from("user")
    .select("name, email, annual, remaining_annual")
    .eq("email", "thhan@weallys.com")
    .single();

    if(error) {
        if(error.code && error.hint === null) {
            return new Response(JSON.stringify("결과가 없습니다."), {status: 404})
        }
        return new Response(JSON.stringify("에러에러"), {status: 500});
    }
    return new Response(JSON.stringify(data), {status : 200});
}