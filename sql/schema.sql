CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS answers (
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question_id       UUID NOT NULL,
    choice         CHAR(1) NOT NULL,
    is_correct  BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question       TEXT NOT NULL,
    option_a       TEXT NOT NULL,
    option_b       TEXT NOT NULL,
    option_c       TEXT NOT NULL,
    option_d       TEXT NOT NULL,
    correct_answer         CHAR(1) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL
)
