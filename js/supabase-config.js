const SUPABASE_URL = 'https://eymnvjeavcarrivqsnaw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bW52amVhdmNhcnJpdnFzbmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4Mjk1MjUsImV4cCI6MjEwNjQwNTUyNX0.fOBgBXxHy5QVmrnH7DAMggYF-IX3nLMT0NShNM7T2uU';

// Environment Variables
// Initialize the Supabase client
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global Media Upload Utility
window.uploadMedia = async function (file) {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await window.supabase.storage
        .from('media')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Upload Error:', error);
        throw error;
    }

    const { data: publicUrlData } = window.supabase.storage
        .from('media')
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
};
