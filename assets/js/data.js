const websiteData = {
    about: {
        vision: `To establish a spiritual and cultural epicenter in Morbi, Gujarat...`,
        mission: [
            {
                title: "Temple Development",
                items: [
                    "Construct the world's largest Bharat Mata Temple...",
                    "Create a sacred space uniting all Indians..."
                ]
            },
            // Other mission items...
        ],
        values: [
            { title: "Nationalism", description: "Fostering love for Bharat..." },
            // Other values...
        ]
    },
    whoWeAre: {
        description: `Founded in 2017, Matru Bhumi Vandana Trust started with...`,
        timeline: [
            { year: "2017", event: "The trust was founded with a mission..." },
            // Other timeline items...
        ]
    },
    events: {
        upcoming: {
            title: "Janta Raja Natak-2025",
            description: "We are organizing Janta Raja Natak-2025...",
            startDate: "2025-05-02T20:00:00",
            endDate: "2025-05-08T23:59:59",
            tickets: [
                { category: "Aaa Killa", price: "200/-" },
                // Other ticket types...
            ],
            contact: "+919429912689, +919429912489"
        },
        pastEvents: [
            {
                title: "Event 1",
                description: "Description of past event...",
                image: "./assets/images/events/event1.jpg"
            },
            // Other past events...
        ]
    }
};

// Function to update GitHub repository
async function updateWebsiteData(newData) {
    try {
        const response = await fetch('https://api.github.com/repos/MatrbhuBhumiVandna/MatruBhumiVandna/contents/assets/js/data.js', {
            method: 'PUT',
            headers: {
                'Authorization': 'token YOUR_GITHUB_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update website content',
                content: btoa(JSON.stringify(newData, null, 2)),
                sha: 'COMMIT_SHA' // Get this from previous API call
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
    }
}
