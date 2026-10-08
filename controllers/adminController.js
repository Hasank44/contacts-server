
export const getAdminMe = async (req, res) => {
    try {
        res.send('Hello');
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Server Error Occurred"
        });
    };
};