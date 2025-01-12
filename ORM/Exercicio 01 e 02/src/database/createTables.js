const { query } = require('./pool')

async function syncDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      event_date TIMESTAMP NOT NULL,
      total_tickets INT NOT NULL,
      sold_tickets INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL,
      is_active BOOLEAN DEFAULT TRUE
    );
    `)
  console.log('Table events created successfully')

  await query(`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    );
    `)
  console.log('Table customers created successfully')

  await query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID PRIMARY KEY,
      event_id UUID NOT NULL,
      customer_id UUID NOT NULL,
      tickets_quantity INT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL,
      FOREIGN KEY (event_id) REFERENCES events (id),
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    );
    `)
  console.log('Table transactions created successfully')

  process.exit(1)
}

syncDatabase()
