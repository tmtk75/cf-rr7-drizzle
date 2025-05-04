INSERT INTO users_table (name, age, email) VALUES ('John Doe', 30, 'john.doe@example.com') ON CONFLICT(email) DO UPDATE SET 
  name = excluded.name,
  age = excluded.age;

INSERT INTO users_table (name, age, email) VALUES ('Alice', 30, 'alice@example.com') ON CONFLICT(email) DO UPDATE SET 
  name = excluded.name,
  age = excluded.age;
