class TalkFusionModel {
    constructor() {
        this.packages = [
            {
                id: 'Entry Pack',
                name: 'Entry Pack',
                price: '$175',
                description: 'Perfect for getting started with Talk Fusion',
                features: [
                    'Basic business tools',
                    '100 Personal Volume (PV)',
                    '$50 Fast Start Bonus',
                    'Essential training materials'
                ]
            },
            {
                id: 'Elite Pack',
                name: 'Elite Pack',
                price: '$350',
                description: 'Enhanced package for serious entrepreneurs',
                features: [
                    'Advanced business tools',
                    '200 Personal Volume (PV)',
                    '$100 Fast Start Bonus',
                    'Premium training materials',
                    'Priority support'
                ]
            },
            {
                id: 'Pro Pack',
                name: 'Pro Pack',
                price: '$700',
                description: 'Complete package for professional success',
                features: [
                    'Full suite of business tools',
                    '400 Personal Volume (PV)',
                    '$200 Fast Start Bonus',
                    'VIP training materials',
                    '24/7 priority support',
                    'Exclusive marketing resources'
                ]
            }
        ];
    }

    getPackages() {
        return this.packages;
    }

    getPackageById(id) {
        return this.packages.find(pkg => pkg.id === id);
    }

    calculateBonus(packageId) {
        const package = this.getPackageById(packageId);
        return package ? parseInt(package.features[2].match(/\$(\d+)/)[1]) : 0;
    }
}

export default TalkFusionModel; 