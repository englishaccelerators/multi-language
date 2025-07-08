
@api_view(['GET'])
def grammar_leaderboard():
    users = User.objects.all()
    leaderboard = []

    for user in users:
        usage = GrammarUsage.objects.filter(user=user, completed=True)
        if usage.exists():
            avg_score = usage.aggregate(Avg('score'))['score__avg'] or 0
            completed_count = usage.count()
            has_cert = CertificateLog.objects.filter(user=user).exists()
            leaderboard.append({
                "username": user.username,
                "completed": completed_count,
                "average_score": avg_score,
                "certificate_awarded": has_cert,
            })

    leaderboard.sort(key=lambda x: (-int(x['certificate_awarded']), -x['completed'], -x['average_score']))
    return Response(leaderboard)
