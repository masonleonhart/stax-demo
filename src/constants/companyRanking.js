const rankingCategory =
{
    women_in_leadership: {
        modified: "diversity",
        type: "percent",
    },
    efficient_water_use: {
        modified: "water",
        type: "percent",
    },
    low_carbon_footprint: {
        modified: "carbon_intensity",
        type: "percent",
    },
    small_business: {
        modified: "small_business",
        type: "percent",
    },
    reduced_waste: {
        modified: "waste",
        type: "int",
    },
    respect_for_human_rights: {
        modified: "human_rights",
        type: "int",
    },
    ethical_practices: {
        modified: "business_ethics",
        type: "int",
    },
};

const conditionalText =
{
    1: 'dosen\'t have any',
    2: 'dosen\'t have any',
    3: 'is having some',
    4: 'is having a lot of',
    5: 'is having a lot of',
    "Reduced Waste": 'its Waste management system.',
    "Respect for Human Rights": 'violation of Human Rights.',
    "Ethical Practices": 'Ethical processes they follows.',
};

export function getAllRankingParam() {
    return rankingCategory;
}

export function getCompanyDescription() {
    return conditionalText;
}