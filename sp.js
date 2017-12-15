Print the absolute difference between the two sums of the matrixs diagonals as a single integer.

function findDiff(n,arr){
    var diff=0;
    var tempN=n-1;
    for(var i=0;i<n;i++){
        diff+=arr[i][i]-arr[i][tempN-i]
    }
    return Math.abs(diff)
}
