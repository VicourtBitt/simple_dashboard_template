"use server"

export async function fetchData<T>(endpoint: string, baseUrl: string = process.env.FETCH_URL as string): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    // Get response as text since it's base64-encoded
    const base64Text = await response.text();
    
    try {
        // Decode the base64 string
        const decodedText = Buffer.from(base64Text, 'base64').toString('utf-8');
        
        // Parse the decoded text as JSON
        return JSON.parse(decodedText) as T;
    } catch (error) {
        console.error("Error decoding base64 response:", error);
        throw new Error("Failed to decode API response");
    }
}

export interface IncomeData {
    datetime: Date; 
    income: number;
}

export async function generateFakeIncomeData(days: number = 30): Promise<IncomeData[]> {
    // For a barchart
    const data: IncomeData[] = [];
    const startDate = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() - i);
        data.push({
            datetime: date,
            income: Math.floor(Math.random() * 800) + 200 // Valores entre 200 e 1000
        });
    }
    return data.reverse();
}

export interface RentData {
    type: 'C' | 'D' | 'R'; // C: Compra, D: Venda, R: Aluguel
    value: number;
}

export async function generateFakeRentData(): Promise<RentData[]> {
    // For a pie chart
    const types: ('C' | 'D' | 'R')[] = ['C', 'D', 'R']; // C: Compra, D: Venda, R: Aluguel
    
    return types.map(type => ({
        type,
        value: Math.floor(Math.random() * 1000) + 100 // Random value between 100-1100
    }));
}
