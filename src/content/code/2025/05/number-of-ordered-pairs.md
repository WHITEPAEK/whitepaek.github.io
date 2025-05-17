---
isDraft: false
title: 순서쌍의 개수
pubDate: 2025-05-15
---

## 문제 설명

순서쌍이란 두 개의 숫자를 순서를 정하여 짝지어 나타낸 쌍으로 (a, b)로 표기합니다. 자연수 n이 매개변수로 주어질 때 두 숫자의 곱이 n인 자연수 순서쌍의 개수를 return 하도록 solution 함수를 완성해주세요.

- n이 20 이므로 곱이 20인 순서쌍은 (1, 20), (2, 10), (4, 5), (5, 4), (10, 2), (20, 1) 이므로 6을 return 합니다.
- n이 100 이므로 곱이 100인 순서쌍은 (1, 100), (2, 50), (4, 25), (5, 20), (10, 10), (20, 5), (25, 4), (50, 2), (100, 1) 이므로 9를 return 합니다.

## 제한사항

- 1 ≤ n ≤ 1,000,000

## 솔루션 코드

#### Review Code
- 시간복잡도: O(√n)
```java
class Solution {
    public int solution(int n) {
        int count = 0;
        
        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                count += 2; // i, n/i 두 쌍
                if (i * i == n) count--; // 제곱수 중복 제거
            }
        }
        
        return count;
    }
}
```

#### Concept

- (a, b) = n
- `a x b = n` and `b = n / a`
- (a, n / a)
