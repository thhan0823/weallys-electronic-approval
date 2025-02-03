import { supabase } from "../lib/supabase";
import { convartKST } from "@/app/util/DateUtil";

export async function GET() {
  const nowTimestamp = convartKST(new Date()).getTime();

  const { data, error } = await supabase
    .from("user")
    .select(
      "id, name, email, annual, remaining_annual, schedule:schedule!inner(user_id, date, approved)"
    )
    .eq("email", "thhan@weallys.com")
    .gt("schedule.date", nowTimestamp)
    .order("date", { foreignTable: "schedule", ascending: true })
    .limit(1, { foreignTable: "schedule" })
    .single();

  if (error) {
    if (error.code && error.hint === null) {
      return new Response(JSON.stringify("결과가 없습니다."), { status: 404 });
    }
    return new Response(JSON.stringify("에러에러"), { status: 500 });
  }
  const timestamp = parseInt(data.schedule[0].date);
  console.log(data.schedule[0].approved);

  return new Response(JSON.stringify(data), { status: 200 });
}
