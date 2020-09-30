function getPullRequests(activity) {
    const filtered = activity.filter(action => {
        if (action.type === 'PullRequestEvent' && action.payload.action === "opened") {
        const month = new Date(action.created_at).getMonth() + 1

        if (month === 10) {
            return action;
        }
        }
    })
    return filtered;
}


window.addEventListener('onWidgetLoad', function(obj) {
    const fieldData = obj.detail.fieldData;
    function update() {
        fetch(`https://api.github.com/users/${fieldData.githubUserName}/events/public`).then(res => {
            res.json().then(data => {
                const currentPrCount = getPullRequests(data).length;
                const counter = `<div class="numbers">${currentPrCount}/${fieldData.targetPrTotal}</div>`
                document.getElementById("counter").innerHTML = counter
            });
        });
    }
    update();
    setInterval(update, fieldData.updateInterval);
})