import React, { useState, useEffect } from 'react';

function App() {
    // Login states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    // Todo states
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    // Login handler
    const login = async () => {
        if (!username || !password) {
            alert('Please enter username and password');
            return;
        }
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            const data = await res.json();
            setToken(data.token);
            alert('Login successful');
            loadItems(); // Load items after login
        } else {
            alert('Invalid username or password');
        }
    };

    // Load todo items
    const loadItems = async () => {
        const res = await fetch('http://localhost:5000/items');
        if (res.ok) {
            const data = await res.json();
            setItems(data);
        } else {
            alert('Failed to load items');
        }
    };

    // Add new todo item
    const addItem = async () => {
        if (!input.trim()) {
            alert('Please enter a valid item');
            return;
        }
        const res = await fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: input.trim() }),
        });
        if (res.ok) {
            setInput('');
            loadItems();
            alert('Item added');
        } else {
            alert('Failed to add item');
        }
    };

    // Start editing an item
    const startEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.name);
    };

    // Save edited item
    const saveEdit = async () => {
        if (!editText.trim()) {
            alert('Please enter a valid item');
            return;
        }
        const res = await fetch(`http://localhost:5000/items/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editText.trim() }),
        });
        if (res.ok) {
            setEditingId(null);
            setEditText('');
            loadItems();
            alert('Item updated');
        } else {
            alert('Failed to update item');
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    // Delete item
    const deleteItem = async (id) => {
        const res = await fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadItems();
            alert('Item deleted');
        } else {
            alert('Failed to delete item');
        }
    };

    // Load items automatically when token changes (after login)
    useEffect(() => {
        if (token) loadItems();
    }, [token]);

    return (
        <div style={{ padding: 20 }}>
            <h1>TestProject</h1>

            {!token ? (
                // Login Form
                <div>
                    <h2>Login</h2>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <button onClick={login}>Login</button>
                </div>
            ) : (
                // Todo List
                <div>
                    <h2>Todo List</h2>

                    <input
                        placeholder="Add new item"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={addItem} style={{ marginLeft: 8 }}>
                        Add
                    </button>

                    <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: 'none' }}>
                        {items.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginBottom: 8,
                                    backgroundColor: '#f0f0f0',
                                    padding: 8,
                                    borderRadius: 4,
                                }}
                            >
                                {editingId === item.id ? (
                                    <>
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <button onClick={saveEdit} style={{ marginLeft: 8 }}>
                                            Save
                                        </button>
                                        <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span>{item.name}</span>
                                        <button
                                            onClick={() => startEdit(item)}
                                            style={{ marginLeft: 12 }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            style={{ marginLeft: 8 }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
