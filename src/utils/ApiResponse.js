class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode || 200
        this.status = "success"
        this.message = message
        this.data = data || null
    }
}
export default ApiResponse