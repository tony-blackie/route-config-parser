const getSchemas = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(response => {
        response.map(item => console.log(`id: ${item.id}, type: ${item.property_type}`));
    });
};

getSchemas('/services/properties/all/schemas?param1&param2');
