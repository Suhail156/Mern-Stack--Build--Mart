import mongoose from 'mongoose';

const purchaseStatsSchema = new mongoose.Schema({
    totalProducts: {
        type: Number,
        required: true,
    },
    totalRevenue: {
        type: Number,
        required: true,
    },
    totalPurchases: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PurchaseStats = mongoose.model('PurchaseStats', purchaseStatsSchema);

export default PurchaseStats;
