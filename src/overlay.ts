import { useEffect, useState } from 'react';
import { supabase } from './api/supabase';

export function useOverlayData() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchSupabase() {
      const response = await supabase
        .from('overlay')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      setData(response.data);
      console.log(response.data);
    }

    supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'overlay' },
        (payload) => {
          setData(payload.new);
        }
      )
      .subscribe();

    fetchSupabase();
  }, []);

  return data;
}

export async function updateOverlayData(data: any) {
  const result = await supabase
    .from('overlay')
    .update({ ...data })
    .eq('id', 1)
    .select();
  return result;
}
