import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState("");
    const [flag, setflag] = useState(0);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
    };

    const handleUpload = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = event.target.result;
            try {
                const jsonData = JSON.parse(fileContent);
                console.log(jsonData);
                await axios.post('http://localhost:5000/mymap/save', { jsonData: jsonData, name: filename });
                console.log('Data uploaded successfully');
                setflag(flag ^ 1);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    };

    const [filenames, setFilenames] = useState([]);
    const [selectedFilename, setSelectedFilename] = useState('');

    useEffect(() => {
        fetchData();
    }, [flag]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-filenames'); 
            setFilenames(response.data);
        } catch (error) {
            console.error('Error fetching filenames:', error);
        }
    };

    const handleFilenameSelect = (filename) => {
        setSelectedFilename(filename);
        console.log('Selected filename:', filename);
    };
    return (
        <>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                <h2>List of Filenames</h2>
                <ul>
                    {filenames.map((filename, index) => (
                        <li key={index} onClick={() => handleFilenameSelect(filename.name)} style={{color: "blue", textDecoration: "underline"}}>
                            {filename.name}
                        </li>
                    ))}
                </ul>
                {selectedFilename && <p style={{fontWeight: "bold"}}>Selected Filename: {selectedFilename}</p>}
            </div>
            <div>
                {selectedFilename && (
                    <div>
                        <Link to={`/map/${selectedFilename}`}>Show Map</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Upload
