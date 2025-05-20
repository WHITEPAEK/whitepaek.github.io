---
isDraft: false
title: 유한소수 판별하기
pubDate: 2025-05-20
---

## 문제 설명

소수점 아래 숫자가 계속되지 않고 유한개인 소수를 유한소수라고 합니다.
분수를 소수로 고칠 때 유한소수로 나타낼 수 있는 분수인지 판별하려고 합니다. 유한소수가 되기 위한 분수의 조건은 다음과 같습니다.
- 기약분수로 나타내었을 때, 분모의 소인수가 2와 5만 존재해야 합니다.
두 정수 a와 b가 매개변수로 주어질 때, a/b가 유한소수이면 1을, 무한소수라면 2를 return 하도록 solution 함수를 완성해주세요.

- 분수 7/20은 기약분수 입니다. 분모 20의 소인수가 2, 5 이기 때문에 유한소수입니다. 따라서 1을 return 합니다.
- 분수 11/22는 기약분수로 나타내면 1/2 입니다. 분모 2는 소인수가 2 뿐이기 때문에 유한소수 입니다. 따라서 1을 return 합니다.
- 분수 12/21는 기약분수로 나타내면 4/7 입니다. 분모 7은 소인수가 7 이므로 무한소수입니다. 따라서 2를 return 합니다.

## 제한사항

- a, b는 정수
- 0 < a ≤ 1,000
- 0 < b ≤ 1,000

## 솔루션 코드

#### Review Code
- 시간복잡도: O(log b)
```java
import java.util.*;

class Solution {
    public int solution(int a, int b) {
        int gcd = getGcd(a, b);
        int n = b / gcd;
        
        while(n % 2 == 0) {
            n /= 2;
        }
        
        while(n % 5 == 0) {
            n /= 5;
        }
        
        return n == 1 ? 1 : 2;
    }
    
    private int getGcd(int a, int b) {   
        while(b != 0) {
            int tmp = a % b;
            a = b;
            b = tmp;
        }
        
        return a;
    }
}
```
