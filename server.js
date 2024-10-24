// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001; // You can change the port if needed

// Hardcoded JSON data
const dbData = {
  assets: [
    { 
      id: "permian", 
      name: "Permian Basin (Texas)",
      rigs: [
        { id: 1, performanceData: { production: 1000, downtime: 5, efficiency: 95 } },
        { id: 2, performanceData: { production: 1200, downtime: 3, efficiency: 97 } },
        { id: 3, performanceData: { production: 1100, downtime: 4, efficiency: 96 } },
        { id: 4, performanceData: { production: 900, downtime: 6, efficiency: 92 } },
        { id: 5, performanceData: { production: 1050, downtime: 2, efficiency: 98 } }
      ]
    },
    { 
      id: "eagle-ford", 
      name: "Eagle Ford Shale (Texas)",
      rigs: [
        { id: 1, performanceData: { production: 800, downtime: 10, efficiency: 90 } },
        { id: 2, performanceData: { production: 850, downtime: 8, efficiency: 89 } },
        { id: 3, performanceData: { production: 780, downtime: 12, efficiency: 88 } },
        { id: 4, performanceData: { production: 820, downtime: 9, efficiency: 91 } },
        { id: 5, performanceData: { production: 830, downtime: 7, efficiency: 92 } }
      ]
    },
    { 
      id: "spraberry", 
      name: "Spraberry Trend (Texas)",
      rigs: [
        { id: 1, performanceData: { production: 950, downtime: 6, efficiency: 93 } },
        { id: 2, performanceData: { production: 970, downtime: 5, efficiency: 94 } },
        { id: 3, performanceData: { production: 920, downtime: 8, efficiency: 92 } },
        { id: 4, performanceData: { production: 900, downtime: 7, efficiency: 91 } },
        { id: 5, performanceData: { production: 940, downtime: 4, efficiency: 95 } }
      ]
    },
    { 
      id: "niobrara", 
      name: "Niobrara Formation (Colorado/Wyoming)",
      rigs: [
        { id: 1, performanceData: { production: 700, downtime: 11, efficiency: 85 } },
        { id: 2, performanceData: { production: 720, downtime: 10, efficiency: 86 } },
        { id: 3, performanceData: { production: 680, downtime: 12, efficiency: 84 } },
        { id: 4, performanceData: { production: 690, downtime: 9, efficiency: 87 } },
        { id: 5, performanceData: { production: 710, downtime: 8, efficiency: 50 } }
      ]
    },
    { 
      id: "bakken", 
      name: "Bakken Formation (North Dakota/Montana)",
      rigs: [
        { id: 1, performanceData: { production: 600, downtime: 15, efficiency: 80 } },
        { id: 2, performanceData: { production: 620, downtime: 14, efficiency: 81 } },
        { id: 3, performanceData: { production: 580, downtime: 16, efficiency: 79 } },
        { id: 4, performanceData: { production: 590, downtime: 13, efficiency: 82 } },
        { id: 5, performanceData: { production: 610, downtime: 12, efficiency: 83 } }
      ]
    }
  ]
};

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page');
});

try{
  // Endpoint to get all assets
  app.get('/assets', (req, res) => {
    res.json(dbData.assets);
});
} catch(error){console.log(error);};


// Endpoint to get a specific asset by ID
try{
  app.get('/assets/:id', (req, res) => {
    const assetId = req.params.id;
    const asset = dbData.assets.find(a => a.id === assetId);
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  });
} catch(error){console.log(error);};

// Catch-all route for invalid URLs (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'The requested URL was not found on this server.',
  });
});

// Error handling middleware (optional for logging errors, etc.)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
