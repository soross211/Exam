-- Command to drop the database if it exists
DROP DATABASE IF EXISTS finaljs;

-- Command to create the database
CREATE DATABASE finaljs;

-- Switch to the newly created database
USE finaljs;

-- Command to drop the 'tasks' table if it exists
DROP TABLE IF EXISTS tasks;

-- Command to create the 'tasks' table
CREATE TABLE
    tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
    );

use finaljs;

DELIMITER // 

CREATE PROCEDURE GenerateTasks () BEGIN DECLARE i INT DEFAULT 1;

WHILE i <= 5555 DO
INSERT INTO
    tasks (task)
VALUES
    (CONCAT ('Task number ', i));

SET
    i = i + 1;

END WHILE;

END //

DELIMITER ;

-- Call the procedure to insert the tasks
CALL GenerateTasks ();