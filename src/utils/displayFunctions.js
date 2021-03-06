export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getNumberOfExpensesByCategory = (expenses, categoryID) => {
    return expenses.reduce((total, expense) => {
        if(expense.category_id == categoryID){
            return total + 1
        }
        return total
    }, 0)
};

export const getCategoryIcon = (categories, categoryName) => {
    let category = categories.find(category => category.category_name === categoryName);
    return category.icon
};

export const getIconTitles = _ => [
    "access-point",
    "account",
    "account-group",
    "accusoft",
    "adjust",
    "air-horn",
    "airballoon",
    "airplane",
    "all-inclusive",
    "alphabetical",
    "anchor",
    "android",
    "android-auto",
    "animation",
    "apple-keyboard-command",
    "arch",
    "archive",
    "artist",
    "atom",
    "audiobook",
    "axe",
    "baby-buggy",
    "badminton",
    "bag-personal",
    "balloon",
    "bank",
    "barley",
    "baseball-bat",
    "basket",
    "basketball",
    "bat",
    "battlenet",
    "beach",
    "bed-empty",
    "beer",
    "biathlon",
    "bike",
    "billiards",
    "binoculars",
    "bitcoin",
    "blender",
    "bomb",
    "book",
    "book-open-variant",
    "bookmark",
    "boombox",
    "border-color",
    "bottle-wine",
    "bow-tie",
    "bowl",
    "boxing-glove",
    "bridge",
    "briefcase",
    "brightness-3",
    "broom",
    "buddhism",
    "brush",
    "buddhism",
    "buffer",
    "bugle",
    "bullseye",
    "bus",
    "cactus",
    "cake",
    "calendar",
    "calendar-check",
    "camcorder",
    "camera",
    "camera-burst",
    "camera-iris",
    "candle",
    "candycane",
    "cannabis",
    "car",
    "car-convertible",
    "car-electric",
    "car-estate",
    "car-wash",
    "cards",
    "carrot",
    "cart",
    "cash",
    "cash-multiple",
    "cassette",
    "castle",
    "cat",
    "cellphone",
    "certificate",
    "charity",
    "chart-areaspline",
    "chart-bar",
    "chart-bell-curve",
    "chart-histogram",
    "chart-line",
    "chart-pie",
    "check-outline",
    "chef-hat",
    "chili-mild",
    "chip",
    "christianity",
    "church",
    "city",
    "clipboard-outline",
    "cloud",
    "clover",
    "coffee",
    "coffin",
    "cogs",
    "controller-classic",
    "cookie",
    "cordova",
    "corn",
    "cow",
    "account",
    "creation",
    "credit-card",
    "cricket",
    "crown",
    "cryengine",
    "cupcake",
    "currency-eur",
    "currency-usd",
    "database",
    "diamond",
    "diamond-stone",
    "dice-5",
    "diving-flippers",
    "dna",
    "doctor",
    "dog-side",
    "download",
    "dumbbell",
    "earth",
    "elephant",
    "elevation-rise",
    "email",
    "engine",
    "ev-station",
    "fan",
    "finance",
    "fingerprint",
    "fire",
    "fireplace",
    "firework",
    "fish",
    "flag-checkered",
    "flash",
    "floor-lamp",
    "flower",
    "food",
    "food-apple",
    "food-croissant",
    "food-fork-drink",
    "football",
    "football-helmet",
    "format-align-justify",
    "format-paint",
    "fountain",
    "fountain-pen-tip",
    "gamepad",
    "gamepad-variant",
    "gas-station",
    "gavel",
    "gift-outline",
    "glass-cocktail",
    "glass-flute",
    "glass-wine",
    "go-kart",
    "golf",
    "google-photos",
    "guitar-acoustic",
    "guitar-electric",
    "halloween",
    "hamburger",
    "hammer",
    "hand-peace",
    "hand-saw",
    "hanger",
    "hat-fedora",
    "headphones",
    "heart",
    "helicopter",
    "highway",
    "hiking",
    "hockey-sticks",
    "home",
    "horseshoe",
    "hotel",
    "ice-cream",
    "image-album",
    "image-filter-vintage",
    "infinity",
    "islam",
    "itunes",
    "judaism",
    "key",
    "knife",
    "laptop-windows",
    "lead-pencil",
    "lifebuoy",
    "lock",
    "medical-bag",
    "monitor",
    "mother-nurse",
    "movie",
    "music",
    "navigation",
    "needle",
    "oil",
    "paw",
    "pharmacy",
    "phone",
    "piano",
    "pine-tree",
    "pistol",
    "pizza",
    "play-pause",
    "playstation",
    "popcorn",
    "puzzle",
    "ring",
    "rocket",
    "rugby",
    "run",
    "account",
    "account",
    "account",
]