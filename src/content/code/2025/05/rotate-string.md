---
isDraft: false
title: 문자열 밀기
pubDate: 2025-05-20
---

## 문제 설명

문자열 "hello"에서 각 문자를 오른쪽으로 한 칸씩 밀고 마지막 문자는 맨 앞으로 이동시키면 "ohell"이 됩니다.
이것을 문자열을 민다고 정의한다면 문자열 A와 B가 매개변수로 주어질 때, A를 밀어서 B가 될 수 있다면 밀어야 하는 최소 횟수를 return 하고 밀어서 B가 될 수 없으면 -1을 return 하도록 solution 함수를 완성해보세요.

- "hello"를 오른쪽으로 한 칸 밀면 "ohell"가 됩니다.
- "apple"은 몇 번을 밀어도 "elppa"가 될 수 없습니다.
- "atat"는 오른쪽으로 한 칸, 세 칸을 밀면 "tata"가 되므로 최소 횟수인 1을 반환합니다.
- "abc"는 밀지 않아도 "abc"이므로 0을 반환합니다.

## 제한사항

- 0 < A의 길이 = B의 길이 < 100
- A, B는 알파벳 소문자로 이루어져 있습니다.

## 솔루션 코드

#### Challenge Code
- 시간복잡도: O(n²)
```java
class Solution {
    public int solution(String A, String B) {
        int n = A.length();
        String word = A;
        
        for (int i = 0; i < n; i++) {
            if (word.equals(B)) {
                return i;
            }
            
            word = word.substring(n - 1, n) + word.substring(0, n - 1);
        }
        
        return -1;
    }
}
```

#### Review Code
- 시간복잡도: O(n)
```java
class Solution {
    public int solution(String A, String B) {
        String doubled = B + B;
        return doubled.indexOf(A);
    }
}
```
