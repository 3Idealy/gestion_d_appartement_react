<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$conn = new mysqli('localhost', 'root', '', 'apartments_db');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query('SELECT * FROM appartement');
    $apartments = [];
    while ($row = $result->fetch_assoc()) {
        $apartments[] = $row;
    }
    echo json_encode($apartments);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare('INSERT INTO appartement (numApp, design, loyer) VALUES (?, ?, ?)');
    $stmt->bind_param('isi', $data['numApp'], $data['design'], $data['loyer']);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Insertion réussie']);
    } else {
        echo json_encode(['message' => 'Échoué']);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare('UPDATE appartement SET numApp = ?, design = ?, loyer = ? WHERE numApp = ?');
    $stmt->bind_param('isii', $data['numApp'], $data['design'], $data['loyer'], $data['numApp']);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Modification réussie']);
    } else {
        echo json_encode(['message' => 'Échoué']);
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['numApp'];
    $stmt = $conn->prepare('DELETE FROM appartement WHERE numApp = ?');
    $stmt->bind_param('i', $id);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Suppression réussie']);
    } else {
        echo json_encode(['message' => 'Échoué']);
    }
}

$conn->close();
?>