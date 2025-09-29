// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Sale {
    id: i64,
    client_name: String,
    status: String,
    product_name: String,
    product_image: Option<String>,
    quantity: i32,
    price: f64,
    total_amount: f64,
    date: NaiveDateTime,
    created_at: NaiveDateTime,
    updated_at: NaiveDateTime,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_sales() -> Result<Vec<Sale>, String> {
    use rand::Rng;
    use chrono::Utc;
    
    let mut rng = rand::thread_rng();
    let mut sales = Vec::new();
    
    // Sample data for random generation
    let clients = vec!["John Doe", "Jane Smith", "Acme Corp", "XYZ Company", "Global Tech"];
    let statuses = vec!["completed", "pending", "shipped", "cancelled"];
    let products = vec!["Laptop", "Smartphone", "Tablet", "Monitor", "Keyboard"];
    
    // Generate 10 random sales records
    for i in 0..10 {
        let client_name = clients[rng.gen_range(0..clients.len())].to_string();
        let status = statuses[rng.gen_range(0..statuses.len())].to_string();
        let product_name = products[rng.gen_range(0..products.len())].to_string();
        let product_name_lower = product_name.to_lowercase(); // Create lowercase version first
        let quantity = rng.gen_range(1..10);
        let price = rng.gen_range(100.0..2000.0);
        let total_amount = quantity as f64 * price;
        
        // Generate random dates within the last 30 days
        let days_ago = rng.gen_range(0..30);
        let date = Utc::now() - chrono::Duration::days(days_ago);
        let created_at = date - chrono::Duration::hours(rng.gen_range(1..24));
        let updated_at = created_at + chrono::Duration::minutes(rng.gen_range(1..60));
        
        sales.push(Sale {
            id: i as i64 + 1,
            client_name,
            status,
            product_name,
            product_image: Some(format!("https://example.com/images/{}.jpg", product_name_lower)),
            quantity,
            price,
            total_amount,
            date: date.naive_utc(),
            created_at: created_at.naive_utc(),
            updated_at: updated_at.naive_utc(),
        });
    }
    
    Ok(sales)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_sales])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}